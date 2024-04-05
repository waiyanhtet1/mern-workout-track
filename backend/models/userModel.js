const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// signup static method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) throw Error("All field must be fill");
  if (!validator.isEmail(email)) throw Error("Email is not valid");
  if (!validator.isStrongPassword(password))
    throw Error("Password not strong enough");

  const isExit = await this.findOne({ email });
  if (isExit) throw Error("Email is already exits");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

// login static method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All field must be fill");

  const user = await this.findOne({ email });
  if (!user) throw Error("Incorrect Email");

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw Error("Incorrect Password");

  return user;
};

module.exports = mongoose.model("User", userSchema);
