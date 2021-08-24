const { runQuery } = require("../config/database.config");
const { findDepositById, addDepositQuery } = require("../queries/fundDeposit");

const addDeposit = async (body) => {
    const { currency, amount } = body;

    const response = await runQuery(addDepositQuery, [currency, amount]);
    return {
        status: "success",
        message: "deposit made successfully",
        code: 201,
        data: response[0],
    }
};

const getSingleDeposit = async (id) => {
    const deposit = await runQuery(findDepositById, [id]);
    if (deposit.length === 0) {
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
        data: deposit
    }
};

module.exports = {
    addDeposit,
    getSingleDeposit
}