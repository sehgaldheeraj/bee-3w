const mongoose = require("mongoose");
//schema
// "    I am the fox " -> "I am the fox"
const userSchema = new mongoose.Schema({
  fullname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

userSchema.methods.verifyPassword = async (password) => {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

//Derive model using Schema
const User = mongoose.model("User", userSchema);

module.exports = User;
