const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  orderID: {
    type: Number,
    require: true,
    unique: true,
  },
  products: [{ type: mongoose.ObjectId, ref: "Product" }],
  receiverName: String,
  receiverAddress: String,
  productType: {
    type: String,
    enum: ["backpack", "pant", "shoes", "shirt", "racket"],
    require: true,
  },
  receiverPhoneNumber: String,
});
const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
