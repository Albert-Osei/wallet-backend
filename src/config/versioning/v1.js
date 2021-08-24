const express = require("express");
const api = express.Router();
const users = require("../../routes/user");
const user_pin = require("../../routes/user-pin");
const transfer = require("../../routes/fundTransfer");
const deposit = require("../../routes/fundDeposit");


api.get("/", (req, res) => 
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the Wallet system',
    })
);

api.use("/users", users);
api.use("/user-pin", user_pin);
api.use("/transfer", transfer);
api.use("/deposit", deposit);

module.exports = api;