const Joi = require('joi');

// Validacion de registro
const userValidation = Joi.object({
    user: Joi.string().min(3).required(),
    pass: Joi.string().min(6).required(),
});

module.exports = { userValidation };