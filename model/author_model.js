const mongoose = require("mongoose");
const nanoid = require("nanoid");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  pic: {
    required: true,
    type: String,
  },
});
mongoose.set("strictQuery", true);
module.exports = mongoose.model("AuthorsData", dataSchema);
