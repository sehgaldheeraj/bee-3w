const User = require("../models/user.model");
const Product = require("../models/product.model");
const router = require("express").Router();
// PATCH /v1/cart/add Add a product to cart: updating our user model
router.patch("/add", async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ info: err.message, message: "Invalid SessionId" });
    }
    const product = await Product.findById(productId);
    let cart;
    if (!user.cart) {
      cart = [];
    }
    cart = user.cart;
    cart.push({ productId: productId, qty: qty });
    await User.findByIdAndUpdate(userId, {
      cart: cart,
      totalPrice: user.totalPrice + product.price * qty,
    });
    res.status(200).json({ cart: cart, totalPrice: totalPrice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Remove a product from cart
router.patch("/remove", async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ info: err.message, message: "Invalid SessionId" });
    }
    const product = await Product.findById(productId);
    let cart;
    if (!user.cart) {
      cart = [];
    }
    cart = user.cart;
    const idx = cart.findIndex((c) => {
      c.productId === productId;
    });
    cart.splice(0, idx, 1);
    await User.findByIdAndUpdate(userId, {
      cart: cart,
      totalPrice: user.totalPrice - product.price * qty,
    });
    res.status(200).json({ cart: cart, totalPrice: totalPrice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//checkout
module.exports = router;
