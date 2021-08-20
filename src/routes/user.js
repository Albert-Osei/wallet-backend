const express = require("express");
const { createUser, getallUsers, getsingleUser, loginUser } = require("../controllers/user.controllers");
const { validateUserSignup, validateUserLogin } = require("../validators/user");

const router = express.Router();

router.get("/", getallUsers);
router.get("/:id", getsingleUser)
router.post("/signup", validateUserSignup, createUser);
router.post("/login", validateUserLogin, loginUser);

module.exports = router;