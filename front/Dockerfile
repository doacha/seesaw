# # build stage
# #################################################
# # docker로 빌드할 이미지를 설정
FROM node as build

# # 작업 경로 및 디렉토리 설정
WORKDIR /app

# # 디폴트 리스소 경로에 있는 package.json 파일을 /app/package.json로 복사
COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

Run corepack enable
Run corepack prepare pnpm@latest-8 --activate
Run pnpm install

# # 디폴트 리소스 경로에 있는 모든 파일을 /app 으로 복사한다.
COPY . /app

# # 빌드 시작
RUN pnpm run build

# # production stage
# #################################################
# # docker 기본 이미지 설정
FROM nginx as production-stage

# # nginx의 기본 설정을 삭제한다.
RUN rm -rf /etc/nginx/conf.d

# # 디폴트 리소스 경로에 있는 conf 폴더를 도커의 /etc/nginx/conf.d로 복사한다.
COPY ./nginx.conf /etc/nginx/conf.d

# # 맨위의 as build 로부터 복사한다는 것을 선언한다. 
# # 그리고 builder의 /app/build를 새로 생성된 컨테이너의 /usr/share/nginx/html로 복사한다.
COPY --from=build /app/.next /usr/share/nginx/html

# # 80포트 오픈하고 nginx 실행
EXPOSE 80