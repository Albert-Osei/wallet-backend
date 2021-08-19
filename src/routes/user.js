const express = require("express");
const { createUser, getallUsers, getsingleUser } = require("../controllers/user.controllers");
const { validateUserSignup } = require("../validators/user");

const router = express.Router();

router.get("/", getallUsers);
router.get("/:id", getsingleUser)
router.post("/signup", validateUserSignup, createUser);

module.exports = router;