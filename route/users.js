const express = require("express");
const userController = require("../src/users/userController");

const router = express.Router();

// Define the signup route
router.route("/signup").post(userController.createUserControllerFn);

// Define the login route
router.route("/login").post(userController.loginUserControllerFn);

module.exports = router;
