const router = require("express").Router();
const Product = require("../models/product.model");
//Create-View
app.get("/addProduct", (req, res) => {
  res.render("addProduct");
});
//Create
app.post("/", async (req, res) => {
  const product = req.body;
  try {
    await Product.create(product);
    return res.status(201).send({ msg: "Product added" });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});
//Read
app.get("/", async (req, res) => {
  try {
    if (req.query) {
      const queriedProducts = await Product.find({ name: req.query });
      return res.render("products", { queriedProducts });
    }
    const products = await Product.find();
    return res.render("products", { products });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});
//Read by Id
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    return res.render("product", { product });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});
//Update by id - view
//Update by id
//Delete by id

module.exports = router;
