const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/env/index");
const { runQuery } = require("../config/database.config");
const { findUserByEmail, addUser, getAllUsersQuery, findUserById } = require("../queries/users");

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

const getSingleUser = async (id) => {
    const user = await runQuery(findUserById, [id]);
    if (user.length === 0) {
        throw {
            status: "error",
            message: "User not found",
            code: 400,
            data: null
        }
    }
    return {
        status: "success",
        message: "User returned successfully",
        code: 200,
        data: user
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

const loginUser = async (body) => {
    const { email, password } = body;
    const user = await findUser(email);
    if (user.length === 0) {
        throw {
            status: "error",
            message: "Wrong email and password combination",
            code: 404,
            data: null,
        };
    }

    const { password: dbPassword, id } = user[0];
    const userPassword = bcrypt.compareSync(password, dbPassword); // checks if true
    if (!userPassword) {
        throw {
            status: "error",
            message: "Wrong password and email combination",
            code: 401,
            data: null,
        };
    }

    const options = {
        expiresIn: "1d",
    };

    const token = jwt.sign(
        {
            id,
            email,
        },
        config.JWT_SECRET_KEY,
        options
    );
    return {
        status: "success",
        message: "Authentication successful",
        code: 200,
        data: {
            user: {
                id,
                email,
            },
            token,
        },
    };
};

module.exports = {
    findUser,
    getExistingUsers,
    createUser,
    loginUser,
    getSingleUser,
}