const mongoose = require("mongoose");
//schema
// "    I am the fox " -> "I am the fox"
const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  role: String,
});
//Derive model using Schema
const User = mongoose.model("User", userSchema);

module.exports = User;
