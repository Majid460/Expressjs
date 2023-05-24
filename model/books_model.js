const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  title: {
    required: true,
    type: String,
  },
  author: {
    required: true,
    type: String,
  },
  about: {
    required: true,
    type: String,
  },
  url: {
    required: true,
    type: String,
  },
});
mongoose.set("strictQuery", true);
module.exports = mongoose.model("BooksData", dataSchema);
