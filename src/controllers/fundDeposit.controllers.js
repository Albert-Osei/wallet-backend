const DepositService = require("../services/fundDeposit.service");

//Get single deposit 
const getSingleDeposit = async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await DepositService.getSingleDeposit(id);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error);
    }
};

//add deposit
const addDeposit = async (req, res, next) => {
    try {
        const response = await DepositService.addDeposit(req.body);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSingleDeposit,
    addDeposit
}