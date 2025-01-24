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
    const {
      idUser,
      products,
      receiverName,
      receiverAddress,
      receiverePhoneNumber,
    } = reqBody;
    const results = await Orders.create({
      idUser,
      receiverName,
      receiverAddress,
      receiverePhoneNumber,
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
