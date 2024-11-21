const route = require("express").Router();

const { signup, login, search } = require("../controller/userController");

route.post("/signup", signup);
route.post("/login", login);
route.post("/search", search);

module.exports = route;
