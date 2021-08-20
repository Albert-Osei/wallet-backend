const Joi = require("joi");

const { baseValidatorForBody } = require("./index");

const validateNewPin = (req, res, next) => {
    const schema = Joi.object({
        pin: Joi.string().required()
    })
    baseValidatorForBody(schema, req, res, next);
}

module.exports = {
    validateNewPin
}