const Joi = require("joi");

const { baseValidatorForBody, baseValidatorForParams } = require("./index");

const validateNewDeposit = (req, res, next) => {
    const schema = Joi.object({
        currency: Joi.string().required(),
        amount: Joi.string().required()
    })
    baseValidatorForBody(schema, req, res, next);
};

const validateId = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().required(),
    });
    baseValidatorForParams(schema, req, res, next);
};

module.exports = {
    validateNewDeposit,
    validateId
}