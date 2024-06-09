// import { AppDataSource } from "./database/data-source";
const express = require("express");
const dotenv = require("dotenv");
const {start} = require("./app");

function initialize() {
  dotenv.config();
  const app = express();
  const { PORT = 3000 } = process.env;

  start(app, PORT);
}

initialize();