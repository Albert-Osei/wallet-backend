const UserService = require("../services/user.service");

//User signup function
const createUser = async (req, res, next) => {
    try {
        const response = await UserService.createUser(req.body);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error)
    }
};

//List all users function
const getallUsers = async (req, res, next) => {
    try {
        const response = await UserService.getExistingUsers();
        return res.status(response.code).json(response);
    } catch (error) {
        next(error)
    }
}

//Get single user function
const getsingleUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await UserService.getSingleUser(id);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUser,
    getallUsers,
    getsingleUser,
}