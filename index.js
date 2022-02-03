require("dotenv").config();
const DB_URI = process.env.MONGO_URI;

const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(cors());

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const operationRoutes = require("./routes/operationRoutes");

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/operation", operationRoutes);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(port, () => console.log(`http://localhost:${port}`));
  })
  .catch((err) => console.log(err));
