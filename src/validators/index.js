const baseValidatorForBody = async (schema, req, res, next) => {
    try {
        req.validatedBody = await schema.validateAsync(req.body);
        req.body = req.validatedBody;
        next();
    } catch (error) {
        next({
            code: 400,
            message: error.message.replace(/[\"]/gi, ""),
            status: "error",
            data: null,
        });
    }
};

const baseValidatorForQuery = async (schema, req, res, next) => {
    try {
        req.validatedQuery = await schema.validateAsync(req.query);
        req.query = req.validatedQuery;
        next();
    } catch (error) {
        next({
            code: 400,
            message: error.message.replace(/[\"]/gi, ""),
            status: "error",
            data: null,
        });
    }
};

const baseValidatorForParams = async (schema, req, res, next) => {
    try {
        req.validatedParams = await schema.validateAsync(req.params);
        req.params = req.validatedParams;
        next();
    } catch (error) {
        next({
            code: 400,
            message: error.message.replace(/[\"]/gi, ""),
            status: "error",
            data: null,
        });
    }
};

module.exports = {
    baseValidatorForBody,
    baseValidatorForParams,
    baseValidatorForQuery,
};