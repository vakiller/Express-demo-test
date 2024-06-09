const express = require('express');
const {json} = require('express');
const {authRouter} = require("./routes/auth.route");
const {itemRouter} = require("./routes/item.route");
const { authenticateToken } = require("./middlewares/authenticate");
const { errorHandler } = require("./middlewares/error-handler");
const { AppDataSource } = require("./database/data-source");

function start(app, port) {
    standardMiddleWare(app);
    routerMiddleWare(app);
    errorMiddleWare(app);
    startServer(app, port);
}

function standardMiddleWare(app) {
    app.use(express.json());
    app.use(json({ limit: '200mb' }));
}

function routerMiddleWare(app) {
    app.use("/auth", authRouter);
    app.use("/item",authenticateToken ,itemRouter);
}

function errorMiddleWare(app) {
    app.use(errorHandler);
}

function startServer(app, port) {
    AppDataSource.initialize().then(async () => {
        app.listen(port, () => {
          console.log("Server is running on http://localhost:" + port);
        });
        console.log("Database Connected!!!");
      })
      .catch((error) => console.log(error));
}

module.exports = {start}