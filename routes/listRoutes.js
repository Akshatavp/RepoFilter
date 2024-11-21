const route = require("express").Router();

const {
  saveList,
  updateList,
  getLists,
  getList,
  deleteList,
} = require("../controller/listController");

route.get("/:uid", getLists);
route.get("/:uid/:listId", getList);
route.delete("/:uid/:listId", deleteList);
route.post("/save/:uid", saveList);
route.put("/update/:listId", updateList);

module.exports = route;
