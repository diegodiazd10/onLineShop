const express = require("express");
const { dbConnection } = require("./db/db");
const cors = require("cors");
require("dotenv").config();

const User = require("./routes/user");
const Role = require("./routes/role");
const Category = require("./routes/category")
const Product = require("./routes/product")

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user/", User);
app.use("/api/role/", Role);
app.use("/api/category/", Category)
app.use("/api/product/", Product)

app.listen(process.env.PORT, () => {
  console.log("Backend server Running on port: " + process.env.PORT);
});

dbConnection();
