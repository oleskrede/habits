FROM node:18-alpine as frontend-builder
COPY habits-frontend ./app
WORKDIR /app
RUN npm install
RUN npm run build

FROM gradle:7-jdk11 AS build
COPY --chown=gradle:gradle ./habits-api /home/gradle/src
WORKDIR /home/gradle/src
RUN rm -rf src/main/resources/habits-web-app/*
COPY --from=frontend-builder app/dist src/main/resources/habits-web-app
RUN gradle buildFatJar --no-daemon

FROM openjdk:11
EXPOSE 8080:8080
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/habits-app.jar
ENTRYPOINT ["java","-jar","/app/habits-app.jar"]