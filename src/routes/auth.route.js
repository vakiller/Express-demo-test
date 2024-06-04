const {Router} = require("express");
const {signup, signin, refreshToken} = require("../modules/auth/auth.controller");
const { validateBody } = require("../middlewares/validate-body");
const { userSchema, refreshTokenSchema } = require("../validation/user.validation");

const authRouter = Router();
authRouter.post("/signup",validateBody(userSchema), signup);
authRouter.post("/signin",validateBody(userSchema), signin);
authRouter.post("/refresh-token",validateBody(refreshTokenSchema), refreshToken);

module.exports = {authRouter};