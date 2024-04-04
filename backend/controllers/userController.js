const User = require("../models/userModel");

// login
async function loginController(req, res) {
  res.send("Login user");
}

// signup
async function signupController(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { loginController, signupController };
