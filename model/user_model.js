const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  pic: {
    required: true,
    type: String,
  },
});
mongoose.set("strictQuery", true);
module.exports = mongoose.model("UserModel", dataSchema);
