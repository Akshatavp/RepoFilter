const route = require("express").Router();

const {
  signup,
  login,
  search,
  userAuth,
} = require("../controller/userController");

const { verifyToken } = require("../utils/middlewares/tokenVerification");

route.post("/signup", signup);
route.post("/login", login);
route.post("/search", verifyToken, search);
route.get("/auth", verifyToken, userAuth);

module.exports = route;
