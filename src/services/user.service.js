const bcrypt = require("bcrypt");
const config = require("../config/env/index");
const { runQuery } = require("../config/database.config");
const { findUserByEmail, addUser, getAllUsersQuery } = require("../queries/users");

const findUser = async (email) => {
    const user = await runQuery(findUserByEmail, [email]);
    return user;
};

const getExistingUsers = async () => {
    const users = await runQuery(getAllUsersQuery);
    return {
        status: "success",
        message: "Users fetched successfully",
        code: 200,
        data: users
    };
};

const createUser = async (body) => {
    const { first_name, last_name, email, phonenumber, password } = body;

    const user = await findUser(email);
    if (user.length > 0) {
        throw {
            code: 409,
            message: "User already exists",
            data: null,
            status: "error",
        };
    }

    const saltRounds = 12;
    const hash = bcrypt.hashSync(password, saltRounds);

    const response = await runQuery(addUser, [first_name, last_name, email, phonenumber, hash]);

    return {
        code: 201,
        status: "success",
        message: `Hello! ${body.email} you have been signed up`,
        data: response[0]
    };
};

module.exports = {
    findUser,
    getExistingUsers,
    createUser,
}