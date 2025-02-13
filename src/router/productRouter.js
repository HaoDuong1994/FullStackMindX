const express = require("express");
const {
  getAllProductController,
  getProductDetail,
  createProductController,
  filterProductController,
  updateProductController,
} = require("../controller/productController");
const productRouter = express.Router();

//Get Product
productRouter.get("/", getAllProductController);
//Get Product by filter
productRouter.get("/filter", filterProductController);
//Get Product by Type and ID
productRouter.get("/product-detail", getProductDetail);
//Create product
productRouter.post("/create", createProductController);
//Update product
productRouter.put("/update", updateProductController);
module.exports = productRouter;
