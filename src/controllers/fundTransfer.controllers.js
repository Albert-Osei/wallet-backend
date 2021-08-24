const TransferService = require("../services/fundTransfer.service");

//Get single transfer function
const getSingleTransfer = async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await TransferService.getSingleTransfer(id);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error);
    }
};

//add transfer function
const addTransfer = async (req, res, next) => {
    try {
        const response = await TransferService.addTransfer(req.body);
        return res.status(response.code).json(response);
    } catch (error) {
       next(error); 
    }
};

module.exports = {
    getSingleTransfer,
    addTransfer
}