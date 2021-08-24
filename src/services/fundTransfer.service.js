const { runQuery } = require("../config/database.config");
const { findTransferByPin, findTransferById, addTransferQuery } = require("../queries/fundTransfer");

const findTransfer = async (pin) => {
    const transfer = await runQuery(findTransferByPin, [pin]);
    return transfer;
};

const addTransfer = async (body) => {
    const { currency, account_number, amount, pin } = body;

    // const transfer = await findTransfer(pin);
    const response = await runQuery(addTransferQuery, [currency, account_number, amount, pin]);
    return {
        status: "success",
        message: "transfer made successfully",
        code: 201,
        data: response[0],
    }
};

const getSingleTransfer = async (id) => {
    const transfer = await runQuery(findTransferById, [id]);
    if (transfer.length === 0) {
        throw {
            status: "error",
            message: "transaction not found",
            code: 400,
            data: null
        }
    };
    return {
        status: "success",
        message: "transaction returned successfully",
        code: 200,
        data: transfer
    }
};

module.exports = {
    findTransfer,
    addTransfer,
    getSingleTransfer
}