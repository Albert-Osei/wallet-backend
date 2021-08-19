const express = require("express");
const { createUser, getallUsers } = require("../controllers/user.controllers");
const { validateUserSignup } = require("../validators/user");

const router = express.Router();

router.get("/", getallUsers);
router.post("/signup", validateUserSignup, createUser);

module.exports = router;