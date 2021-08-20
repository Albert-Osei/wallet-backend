const { runQuery } = require("../config/database.config");
const { findPin, createPinQuery } = require("../queries/user-pin");

const createPin = async (body) => {
    const { pin } = body;

    const user_pin = await runQuery(findPin, [pin]);
    if (user_pin.length > 0) {
        throw {
            status: "error",
            message: "pin already exists",
            code: 409,
            data: null
        };
    }
    const response = await runQuery(createPinQuery, [pin]);
    return {
        status: "success",
        message: "Pin created successfully",
        code: 201,
        data: response[0]
    }
};

module.exports = {
    createPin
}

