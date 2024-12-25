const mongoose = require("mongoose");
const mongoDBConnect = async (app) => {
  //
  const connect = await mongoose.connect(
    "mongodb+srv://webfullstack:webfullstack@cluster0.pdqogtf.mongodb.net/webfullstack"
  );
  return connect;
};
module.exports = mongoDBConnect;
