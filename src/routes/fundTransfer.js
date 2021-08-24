const express = require("express");
const TransferController = require("../controllers/fundTransfer.controllers");
const TransferValidator = require("../validators/fundTransfer");
const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/:id", TransferValidator.validateId, TransferController.getSingleTransfer);
router.post("/", verifyToken, TransferValidator.validateNewTransfer, TransferController.addTransfer);


module.exports = router;