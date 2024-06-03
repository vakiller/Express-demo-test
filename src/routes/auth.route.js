const {Router} = require("express");
const {signup} = require("../modules/auth/auth.controller");

const authRouter = Router();
authRouter.post("/signup", signup);

module.exports = {authRouter};