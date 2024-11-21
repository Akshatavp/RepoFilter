require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

const DBconnection = require("./config/DBconnection");

const userRoutes = require("./routes/userRoutes");
const listRoutes = require("./routes/listRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/list", listRoutes);

app.use("/helpers", express.static(path.join(__dirname, "client/helpers")));
app.use(express.static(path.join(__dirname, "client/pages")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/pages/index.html"));
});

DBconnection();

app.listen(process.env.PORT, () => {
  console.log("Server running on port: " + process.env.PORT);
});
