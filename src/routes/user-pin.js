const express = require("express");
const PinController = require("../controllers/user-pin.controllers");
const PinValidator = require("../validators/user-pin");
const { verifyToken } = require("../middlewares/auth.middleware");


const router = express.Router();

router.post("/", verifyToken, PinValidator.validateNewPin, PinController.createPin);

module.exports = router;