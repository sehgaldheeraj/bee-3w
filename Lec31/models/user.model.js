const mongoose = require("mongoose");
//schema
// "    I am the fox " -> "I am the fox"
const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId , required: true, unique: true },
  quantity: { type: number, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  cart: [cartSchema],
  totalPrice: { type: Number, default: 0 },
});
e;

userSchema.methods.verifyPassword = async (password) => {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

//Derive model using Schema
const User = mongoose.model("User", userSchema);

module.exports = User;
