FROM ubuntu:latest
ARG GITHUB_TOKEN
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install curl -y
RUN apt-get update
RUN apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update
RUN apt-get install nodejs -y
RUN node -v
RUN mkdir -p /home/wiseadme/www/uploads
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
COPY dist /usr/src/app
RUN npm install npm@10.5.1 -g
RUN npm set @proshop-app:registry=https://npm.pkg.github.com
RUN npm set "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}"
RUN npm install
#COPY ./.env /usr/src/app/dist
