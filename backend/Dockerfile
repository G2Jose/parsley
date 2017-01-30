FROM node:latest
MAINTAINER author
LABEL Name=parsley-backend Version=0.0.1 
COPY package.json /tmp/package.json
RUN npm install -g -q yarn sails
RUN cd /tmp && yarn install --production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN mv /tmp/node_modules /usr/src/app/
EXPOSE 1337
CMD sails lift
