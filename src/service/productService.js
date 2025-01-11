const database = require("../config/mysqlConnection");
const Product = require("../Model/productModel");
const getAllProductService = async (reqQuery) => {
  try {
    const checkObjectNull = Object.values(reqQuery).length;
    // const connection = await database();
    if (reqQuery && !checkObjectNull == 0) {
      const { page, productType } = reqQuery;
      const limit = 8;
      let offset = (page - 1) * limit;
      if (productType !== "all") {
        // const [data] = await connection.query(
        //   `select * from products
        //   where productType = '${productType}'
        //   limit ${limit} offset ${offset}`
        // );
        const data = await Product.find({ productType })
          .limit(limit)
          .skip(offset)
          .exec();
        return data;
      }
      if (productType == "all") {
        // const [data] = await connection.query(
        //   `select * from products limit ${limit} offset ${offset}`
        // );
        // return data;
        const data = await Product.find().skip(offset).limit(limit).exec();
        return data;
      }
    } else {
      // const [data] = await connection.query("select * from products");
      const data = await Product.finđ({});
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log("error from getProductService", error);
  }
};

const createProductService = async (reqBody) => {
  try {
    const {
      productCode,
      productName,
      buyPrice,
      description,
      img,
      productType,
    } = reqBody;
    // const connection = await database();
    // const [data] = await connection.query(
    //   `INSERT INTO products (productCode, productName, buyPrice, description, img, productType)
    //   VALUES('${productCode}', '${productName}', ${Number(
    //     buyPrice
    //   )}, '${description}', '${img}', '${productType}')`
    // );
    // return data;
    const data = await Product.create({
      productCode,
      productName,
      buyPrice,
      description,
      img,
      productType,
    });
    return data;
  } catch (error) {
    console.log("error from create product", error);
  }
};

const getDetailsProductService = async (productID) => {
  try {
    const connection = await database();
    const [data] = await connection.query(
      `select * from products where productCode = '${productID}'`
    );
    const imgDetailProduct = await connection.query(
      `select src from productImg where productId = '${productID}' `
    );
    const imgDetail = imgDetailProduct[0];
    data[0].imgStorage = imgDetail;
    return data[0];
  } catch (error) {
    console.log("error from getDetailProductService", error);
  }
};

const searchProductService = async (stringData) => {
  try {
    const connection = await database();
    const [data] = await connection.query(
      `SELECT * FROM products WHERE productName like '%${stringData}%' limit 8`
    );
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
const filterProductService = async (reqQuery) => {
  try {
    // filter
    // $eq  => Equal
    // $ne  => Not equal
    // $gt  => Greater than
    // $gte => Greater than or equal to
    // $lt  => Less than
    // $lte => Less than or equal to
    // const connection = await database();
    const { price, productName } = reqQuery;
    console.log(price);
    //find product price under 500.000
    if (price == 1) {
      // const [data] = await connection.query(
      //   `SELECT * FROM products WHERE buyPrice < 500000 and productName like '%${productName}%' LIMIT 8`
      // );
      const data = await Product.find({ buyPrice: { $lt: 500000 } });
      if (data.length == 0)
        return {
          EC: 1,
          message: "no product found",
        };
      return {
        EC: 0,
        quantity: data.length,
        data,
      };
    }
    //find product price from 500.000 to 1.500.000
    if (price == 2) {
      // const [data] = await connection.query(
      //   `SELECT * FROM products WHERE buyPrice BETWEEN 500000 AND 1500000 AND productName like '%${productName}%' LIMIT 8`
      // );
      const minPrice = 500000;
      const maxPrice = 1500000;
      const keyWord = productName;
      const data = await Product.find({
        buyPrice: { $gte: minPrice, $lte: maxPrice },
        productName: { $regex: keyWord, $options: "i" },
      })
        .limit(8)
        .exec();
      if (data.length == 0)
        return {
          EC: 1,
          message: "No product found",
        };
      return {
        EC: 0,
        quantity: data.length,
        data,
      };
    }
    //find product price from 500.000 to 1.500.000
    if (price == 3) {
      const [data] = await connection.query(
        `SELECT * FROM products WHERE buyPrice BETWEEN 1500000 AND 2500000 AND productName like '%${productName}%' LIMIT 8`
      );
      if (data.length == 0)
        return {
          EC: 1,
          message: "No product found",
        };
      return {
        EC: 0,
        quantity: data.length,
        data,
      };
    }
    //find product price over 2.500.000
    if (price == 4) {
      const [data] = await connection.query(
        `SELECT * FROM products WHERE buyPrice > 2500000   AND productName like '%${productName}%' LIMIT 8`
      );
      if (data.length == 0)
        return {
          EC: 1,
          message: "No product found",
        };
      return {
        EC: 0,
        quantity: data.length,
        data,
      };
    }
  } catch (error) {
    console.log("error from filter product service", error);
  }
};
module.exports = {
  getAllProductService,
  createProductService,
  getDetailsProductService,
  searchProductService,
  filterProductService,
};
