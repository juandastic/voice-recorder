## Voice Recorder

This is a basic CRUD of audios that are recorded by the user directly on the browser.

Live Demo available on https://voice-recorder.gmz2.work/

### Runing the Project
There are two ways to run this project: usign MongoDB and NodeJs on your environment or usign the docker container.
however you have to run `npm install` for the two alternatives

#### Using your own machine
- You need MongoDb installed and running
- On the root folder run `npm run start:server`

This will run the SPA build and after that the server

*Note : The static files sever is at the same time the API server*

#### Using a docker container
- You need Docker installed
- On the root folder run `docker-compose up`

This will create two containers one with MongoDb and anotherone with the SPA and API server
