const express = require("express");
const router = express.Router();
const {
  loginController,
  signupController,
} = require("../controllers/userController");

// login user
router.post("/login", loginController);

// signup user
router.post("/signup", signupController);

module.exports = router;
