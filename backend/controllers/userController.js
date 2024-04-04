// login
async function loginController(req, res) {
  res.send("Login user");
}

// signup
async function signupController(req, res) {
  res.send("Sign Up user");
}

module.exports = { loginController, signupController };
