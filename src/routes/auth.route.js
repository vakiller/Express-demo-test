const {Router} = require("express");
const {signup, signin, refreshToken} = require("../modules/auth/auth.controller");

const authRouter = Router();
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/refresh-token", refreshToken);

module.exports = {authRouter};