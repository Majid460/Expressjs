const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/books_api_routes");
const { Constants } = require("./utils/constants");
var bodyParser = require("body-parser");

const dev_db_url = Constants.dev_db_url;
const DATABASE_URL = process.env.MONGODB_URI || dev_db_url;
const mongoString = DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
// Initialize App

const app = express();
app.use(bodyParser.json());
//for users database
//app.use("/api", routes);

// for books data
app.use("/api", routes);
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
