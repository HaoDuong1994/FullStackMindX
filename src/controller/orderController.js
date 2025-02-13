const { createOrderService } = require("../service/orderService");
const createOrderController = async (req, res) => {
  try {
    const result = await createOrderService(req.body);
    if (result.EC == 1) {
      res.status(400).json({
        EC: 1,
        message: result.message,
      });
    } else {
      res.status(200).json({
        EC: 0,
        message: "Create order sucess",
        result,
      });
    }
  } catch (error) {
    console.log("error create order  controller", error);
  }
};
module.exports = {
  createOrderController,
};
