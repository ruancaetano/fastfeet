# base image
FROM node:12.16.1-alpine

# set working directory
WORKDIR /usr/app

# install dependencies
COPY package*.json .
RUN npm install

# start app
CMD ["npm", "run", "start"]
