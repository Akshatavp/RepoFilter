require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const DBconnection = require("./config/DBconnection");

const userRoutes = require("./routes/userRoutes");
const listRoutes = require("./routes/listRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/list", listRoutes);

DBconnection();

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
