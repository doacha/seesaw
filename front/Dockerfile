# # build stage
# #################################################
# # docker로 빌드할 이미지를 설정
# FROM node as build

# # 작업 경로 및 디렉토리 설정
# WORKDIR /app

# # 디폴트 리스소 경로에 있는 package.json 파일을 /app/package.json로 복사
# COPY package.json /app/package.json

# # 웹앱의 구동, 빌드 등 사용시 react-scripts를 사용한다.
# Run corepack enable
# Run corepack prepare pnpm@latest-8 --activate
# Run pnpm install

# # 디폴트 리소스 경로에 있는 모든 파일을 /app 으로 복사한다.
# COPY . /app

# # 빌드 시작
# RUN pnpm run build

# # production stage
# #################################################
# # docker 기본 이미지 설정
# FROM nginx as production-stage

# # nginx의 기본 설정을 삭제한다.
# RUN rm -rf /etc/nginx/conf.d

# # 디폴트 리소스 경로에 있는 conf 폴더를 도커의 /etc/nginx/conf.d로 복사한다.
# COPY ./nginx.conf /etc/nginx/conf.d

# # 맨위의 as build 로부터 복사한다는 것을 선언한다. 
# # 그리고 builder의 /app/build를 새로 생성된 컨테이너의 /usr/share/nginx/html로 복사한다.
# COPY --from=build /app/.next /usr/share/nginx/html

# # 80포트 오픈하고 nginx 실행
# EXPOSE 80



# base image 설정 (as build 로 완료된 파일을 밑에서 사용할 수 있다.)
FROM node as build

# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /app

# app dependencies
# 컨테이너 내부로 package.json 파일들을 복사
COPY package*.json ./
COPY pnpm-lock.yaml ./

# package.json 및 package-lock.json 파일에 명시된 의존성 패키지들을 설치
Run corepack enable
Run corepack prepare pnpm@latest-8 --activate
Run pnpm install

# 호스트 머신의 현재 디렉토리 파일들을 컨테이너 내부로 전부 복사
COPY . .

# npm build
RUN pnpm run build

# prod environment
FROM nginx

# 이전 빌드 단계에서 빌드한 결과물을 /usr/share/nginx/html 으로 복사한다.
COPY --from=build /app/.build /usr/share/nginx/html

# 기본 nginx 설정 파일을 삭제한다. (custom 설정과 충돌 방지)
RUN rm /etc/nginx/conf.d/default.conf

# custom 설정파일을 컨테이너 내부로 복사한다.
COPY nginx.conf /etc/nginx/conf.d

# 컨테이너의 80번 포트를 열어준다.
EXPOSE 80

# nginx 서버를 실행하고 백그라운드로 동작하도록 한다.
CMD ["nginx", "-g", "daemon off;"]