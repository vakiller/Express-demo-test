const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).required()
});

const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required()
});

module.exports = { userSchema, refreshTokenSchema };