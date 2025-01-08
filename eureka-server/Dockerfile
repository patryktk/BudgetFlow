FROM openjdk:17-alpine
RUN apk add --no-cache curl
LABEL authors="Patryk"
WORKDIR /app

COPY target/eureka-server-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]