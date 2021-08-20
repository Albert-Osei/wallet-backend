const PinService = require("../services/user-pin.service");

//createPin function
const createPin = async (req, res, next) => {
    try {
        const response = await PinService.createPin(req.body);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error)
    }
};

module.exports = {
    createPin
}

