const express = require("express");
const api = express.Router();
const users = require("../../routes/user");
const user_pin = require("../../routes/user-pin");


api.get("/", (req, res) => 
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the Wallet system',
    })
);

api.use("/users", users);
api.use("/user-pin", user_pin);


module.exports = api;