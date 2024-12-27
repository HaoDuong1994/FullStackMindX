const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  productCode: {
    type: String,
    require: true,
    unique: true,
  },
  productName: {
    type: String,
    require: true,
  },
  buyPrice: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  productType: {
    type: String,
    enum: ["backpack", "pant", "shoes", "shirt", "racket"],
    require: true,
  },
});
const Customers = mongoose.model("Customers", productSchema);
module.exports = Customers;
