FROM node:8.10.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

EXPOSE 3000
CMD [ "npm", "run" ,"start:server" ]