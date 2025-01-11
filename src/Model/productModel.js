const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  buyPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    enum: ["backpack", "pant", "shoes", "shirt", "racket"],
    required: true,
  },
});
const Products = mongoose.model("Product", productSchema);
module.exports = Products;
