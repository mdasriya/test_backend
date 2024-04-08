const express = require("express");
const router = express.Router()

const { createUser, getUserDetails } = require("../controlers/User");

router.post("/createUser", createUser);
router.post("/getUserDetails", getUserDetails);

module.exports = router