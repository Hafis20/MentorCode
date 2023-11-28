// Server configuration
const express = require("express");
const app = express();

// .env configuration
const dotenv = require("dotenv");
dotenv.config();

// Mongodb configuration
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDb Connected"))
  .catch((error) => console.log(error.message));

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
