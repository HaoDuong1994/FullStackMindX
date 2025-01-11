const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  personID: {
    type: Number,
    require: true,
    unique: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  passwordUser: {
    type: String,
    require: true,
  },
  imgProfile: {
    type: String,
    require: true,
  },
});
const Customers = mongoose.model("Customers", customerSchema);
module.exports = Customers;
