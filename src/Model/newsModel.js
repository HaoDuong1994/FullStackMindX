const mongoose = require("mongoose");
const newsSchema = new mongoose.Schema({
  newsId: {
    type: String,
    unique: true,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  descriptionNews: {
    type: String,
  },
  content: {
    type: String,
    require: true,
  },
});
const News = mongoose.model("News", newsSchema);
module.exports = News;
