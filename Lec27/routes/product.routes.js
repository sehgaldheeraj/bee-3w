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
router.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  res.render("updateProduct", { id });
});
//Update by id - =/v1/products/<%= id %> / v1/products/123jbd23
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, desc, price, quantity, category, image } = req.body;
  try {
    await Product.findByIdAndUpdate(id, {
      name: name,
      desc: desc,
      price: price,
      quantity: quantity,
      category: category,
      image: image,
    });
    res.redirect("/v1/products"); //redirect always makes a get request
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});
//Delete by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.redirect("/v1/products"); //redirect always makes a get request
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

module.exports = router;
