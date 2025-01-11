const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { configEJS } = require("./src/config/templateEngine");
const customerRouter = require("./src/router/customerRouter");
const configBodyParser = require("./src/config/bodyParser");
const productRouter = require("./src/router/productRouter");
const orderRouter = require("./src/router/orderRouter");
const orderDetailsRouter = require("./src/router/orderDetailsRouter");
const newsRouter = require("./src/router/newsRouter");
const mongoDBConnect = require("./src/config/MongodbConnect");
//Config body parser
configBodyParser(app);
//Config cors
app.use(cors());
//Config view engine and static file
configEJS(app, express);
//Config cookie parsers
app.use(cookieParser());
//App listening
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port`, process.env.PORT);
});
// Config connection MongoDB
const connection = async () => {
  await mongoDBConnect();
};
connection();

////////////////////API//////////////////////////

//Customer API
app.use("/customer", customerRouter);

//Product API
app.use("/product", productRouter);

//Order API
app.use("/orders", orderRouter);

//Order Details API
app.use("/orderDetails", orderDetailsRouter);

//News API
app.use("/news", newsRouter);
