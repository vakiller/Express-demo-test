const {Router} = require("express");
const {signup, signin} = require("../modules/auth/auth.controller");

const authRouter = Router();
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

module.exports = {authRouter};