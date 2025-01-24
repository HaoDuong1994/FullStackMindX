const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  idUser: { type: mongoose.ObjectId, ref: "Customers" },
  products: [{ type: mongoose.ObjectId, ref: "product" }],
  receiverName: String,
  receiverAddress: String,
  receiverPhoneNumber: String,
});
const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
