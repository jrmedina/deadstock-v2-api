const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  release: { type: String, required: true },
  colors: { type: Array, required: true },
  brand: { type: String, required: true },
  size: { type: Number, required: true },
  quantity: { type: Number, required: true },
  url: { type: String, required: true },
  code: { type: String, required: true },
  user: { type: String, required: true },
  id: { type: Number, required: true },
  contact: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Products", productSchema);
