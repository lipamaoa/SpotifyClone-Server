const router = require("express").Router();
const { User, validate } = require("../models/user");
const { signUp } = require("../controllers/authenticationController");

//Create a new user

router.post("/", signUp );

module.exports = router;
