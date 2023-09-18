FROM gradle:8.2.1-jdk17-alpine AS builder
WORKDIR /app
# 그래들 파일이 변경되었을 때만 새롭게 의존패키지 다운로드 받게함.
COPY build.gradle settings.gradle /app/
RUN gradle clean build -x test --parallel --continue > /dev/null 2>&1 || true
# 빌더 이미지에서 애플리케이션 빌드
COPY ./ ./
RUN gradle build -x test --parallel

FROM openjdk:17
WORKDIR /app
# ARG JAR_FILE=/build/libs/*.jar
COPY --from=builder /app/build/libs/*.jar /app/app.jar
# 해당 컨테이너는 8080 port 사용 (생략 가능)
EXPOSE 8080
# docker run 시 실행할 필수 명령어
ENTRYPOINT ["java", "-jar", "app.jar"]

# 시간 설정
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul