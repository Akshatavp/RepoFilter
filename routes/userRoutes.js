const route = require("express").Router();

const { signup, login, search } = require("../controller/userController");

const { verifyToken } = require("../utils/middlewares/tokenVerification");

route.post("/signup", signup);
route.post("/login", login);
route.post("/search", verifyToken, search);

module.exports = route;
