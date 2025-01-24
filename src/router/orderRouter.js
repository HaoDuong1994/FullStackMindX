const express = require("express");
const { createOrderController } = require("../controller/orderController");
const orderRouter = express.Router();
//MySQL
orderRouter.post("/create", createOrderController);
//MongoDB
orderRouter.post("/create-order", createOrderController);
module.exports = orderRouter;
