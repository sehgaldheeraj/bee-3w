const mongoose = require("mongoose");
//schema
// "    I am the fox " -> "I am the fox"
const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  role: String,
});

userSchema.methods.verifyPassword = async (password) => {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

//Derive model using Schema
const User = mongoose.model("User", userSchema);

module.exports = User;
