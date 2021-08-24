const express = require("express");
const DepositController = require("../controllers/fundDeposit.controllers");
const DepositValidator = require("../validators/fundDeposit");
const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/:id",DepositValidator.validateId, DepositController.getSingleDeposit);
router.post("/", verifyToken, DepositValidator.validateNewDeposit, DepositController.addDeposit);

module.exports = router;