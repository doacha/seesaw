#Stage 1
#######################################
FROM node:20 AS builder

# set working directory
WORKDIR /app

# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package-lock.json ./
COPY package.json ./

# Installs all node packages
RUN pnpm i

# Copies everything over to Docker environment
COPY . ./
RUN pnpm run build


#Stage 2
#######################################
#pull the official nginx base image
FROM nginx

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

# Remove default nginx static resources
RUN rm -rf ./usr/share/nginx/html/*
# Copies static resources from builder stage
COPY --from=builder /app/build /usr/share/nginx/html/

# Containers run nginx with global directives and daemon off
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]