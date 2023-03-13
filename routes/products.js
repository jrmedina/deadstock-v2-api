const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ONE
router.get("/:id", getProduct, (req, res) => {
  res.json(res.product);
});

// CREATING ONE
router.post("/", async (req, res) => {
  console.log(req.body);

  const product = new Product({
    title: req.body.title,
    release: req.body.release,
    colors: req.body.colors,
    brand: req.body.brand,
    size: req.body.size,
    quantity: req.body.quantity,
    url: req.body.url,
    code: req.body.code,
    user: req.body.user,
    id: req.body.id,
    contact: req.body.contact,
    price: req.body.price,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATING ONE
router.patch("/:id", getProduct, async (req, res) => {
  if (req.body.title != null) {
    res.product.title = req.body.title;
  }
  if (req.body.release != null) {
    res.product.release = req.body.release;
  }
  if (req.body.colors != null) {
    res.product.colors = req.body.colors;
  }
  if (req.body.brand != null) {
    res.product.brand = req.body.brand;
  }
  if (req.body.size != null) {
    res.product.size = req.body.size;
  }
  if (req.body.quantity != null) {
    res.product.quantity = req.body.quantity;
  }
  if (req.body.url != null) {
    res.product.url = req.body.url;
  }
  if (req.body.code != null) {
    res.product.code = req.body.code;
  }
  if (req.body.user != null) {
    res.product.user = req.body.user;
  }
  if (req.body.id != null) {
    res.product.id = req.body.id;
  }
  if (req.body.contact != null) {
    res.product.contact = req.body.contact;
  }
  if (req.body.code != null) {
    res.product.price = req.body.price;
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE ONE
router.delete("/:id", getProduct, async (req, res) => {
  try {
    await res.product.deleteOne();
    res.json({ message: "Deleted Product" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// MIDDLEWARE FUNCTIONS
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

module.exports = router;
