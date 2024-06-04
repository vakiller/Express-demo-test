const Joi = require('joi');

const itemSchema = Joi.object({
    name: Joi.string().required(),
    damage: Joi.number().less(101).required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    userId: Joi.number()
});

module.exports = {itemSchema};