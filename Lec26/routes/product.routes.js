const router = require("express").Router();
const Product = require("../models/product.model");
//Create-View
router.get("/new", (req, res) => {
  res.render("addProduct");
});
//Create
router.post("/", async (req, res) => {
  const product = req.body;
  try {
    await Product.create(product);
    //return res.status(201).send({ msg: "Product added" });
    return res.redirect("/v1/products");
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});
//Read all products
router.get("/", async (req, res) => {
  const { query } = req.query;
  try {
    if (query) {
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
router.get("/:id", async (req, res) => {
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
