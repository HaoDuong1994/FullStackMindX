const database = require("../config/mysqlConnection");
const Orders = require("../Model/ordersModel");
const createOrderService = async (reqBody) => {
  try {
    // const connection = await database();
    // const { idUser } = reqBody;
    // const [results, fields] = await connection.query(`
    //     INSERT INTO orders (personID, receiverName, customerNote, receiverAddress, receiverPhoneNumber)
    //     VALUES(${idUser}, '${reqBody.receiverName}', '${reqBody.note}', '${reqBody.note}', '${reqBody.phoneNumber}')
    //     `);
    // if (results) {
    //   return {
    //     idUser,
    //     results,
    //     idOrder: results.insertId,
    //   };
    // }
    console.log(reqBody);
    let methodPayment = "";
    if (reqBody.card) {
      methodPayment = "card";
    } else {
      methodPayment = "cash";
    }
    const { idUser, products, receiverName, address, phoneNumber, totalPrice } =
      reqBody;
    const results = await Orders.create({
      idUser,
      receiverName,
      receiverAddress: address,
      receiverePhoneNumber: phoneNumber,
      totalPrice,
      methodPayment,
    });
    if (results._id) {
      const currentOrder = await Orders.findById(results._id).exec();
      for (let i = 0; i < products.length; i++) {
        currentOrder.products.push(products[i]);
      }
      let newOrder = await currentOrder.save();
      return newOrder;
    }
  } catch (error) {
    console.log("error from order service", error);
    return {
      EC: 1,
      message: error.sqlMessage,
    };
  }
};
module.exports = {
  createOrderService,
};
