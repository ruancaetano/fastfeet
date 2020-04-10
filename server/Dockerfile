# base image
FROM node:12.16.1-alpine

# set working directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .
RUN npm install

# Bundle app source
COPY . .


# This image is used for two services (server and queue) for that reason or entry point
# is defined by docker-compose.yml at the project root
