const express = require("express");
const api = express.Router();


api.get("/", (res,req) => 
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the Wallet system'
    })
);



module.exports = api;