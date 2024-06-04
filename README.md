# Table of Contents
1. [Description](#description)
2. [Getting started](#getting-started)
3. [Usage](#usage)
5. [Structure](#structure)

# Express Js Demo
A simple Express Project implement with Express Js + TypeOrm + Postgresql!

# Description
<p>This is a simple and straightforward introduction to using type orm in express js with JavaScript not TypeScript.<br>

# Getting started

### Run directly in local machine
<p>
1. Node 18 and above<br>
2. Docker Latest Version <br>
3. Pull project from repository.<br>
4. cd to project folder. <br>
5. Run: yarn install<br>
6. Run: docker compose up -d postgres_service
7. Run: yarn start:dev.<br>
8. With Unit Test simply run: yarn test.<br>
The server running in port 3000 by default.<br>

### Run directly with docker
<p>
1. Docker latest version
2. Pull project from repository.<br>
3. cd to project folder. <br>
4. Run: docker compose up -d <br>
The server running in port 3000 by default.<br>

# Usage
It's a simple rest api application, we can create new user, sign in, get new token with refresh token, CRUD items data, each users can have multiple items or one item can not be own by any user (userId = null). Detail please see in the postman collection.

# Structure 
* "database": Database datasource, migration files and entities files.
* "helper": Helpers code such as token helpers or common erros.
* "middlewares": Middlewares files. 
* "module": Modules of the app, right now have auth and item module, each module have controller, service and test files.
* "docker files": Docker compose file and Dockerfile
* ".env": enviroment file.

