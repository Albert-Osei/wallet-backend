const Joi = require("joi");

const { baseValidatorForBody, baseValidatorForParams } = require("./index");

const validateNewTransfer = (req, res, next) => {
    const schema = Joi.object({
        currency: Joi.string().required(),
        account_number: Joi.string().required(),
        amount: Joi.string().required(),
        pin: Joi.string().required(),
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
    validateNewTransfer,
    validateId
}