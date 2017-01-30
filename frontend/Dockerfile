FROM node:latest
MAINTAINER author
LABEL Name=parsley-backend Version=0.0.1 
COPY package.json /tmp/package.json
RUN npm install -g -q yarn
RUN cd /tmp && yarn install
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN mv /tmp/node_modules /usr/src/app/
EXPOSE 3000
CMD npm start
