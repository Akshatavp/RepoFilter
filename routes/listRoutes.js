const route = require("express").Router();

const {
  saveList,
  updateList,
  getLists,
  getList,
  deleteList,
} = require("../controller/listController");

const { verifyToken } = require("../utils/middlewares/tokenVerification");

route.get("/:uid", verifyToken, getLists);
route.get("/:uid/:listId", verifyToken, getList);
route.delete("/:uid/:listId", verifyToken, deleteList);
route.post("/save/:uid", verifyToken, saveList);
route.put("/update/:listId", verifyToken, updateList);

module.exports = route;
