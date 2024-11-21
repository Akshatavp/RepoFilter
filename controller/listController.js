const List = require("../models/listSchema");

exports.saveList = async (req, res) => {
  const { name, codeList } = req.body;
  const { uid } = req.params;

  const list = await List({
    userId: uid,
    name: name,
    list: codeList,
  });

  await list.save();

  res.status(201).json({
    message: "List saved",
  });
};

exports.updateList = async (req, res) => {
  const { name, codeList } = req.body;
  const { listId } = req.params;

  try {
    let list = await List.findById(listId);

    if (list) {
      list.name = name;
      list.list = codeList;
      await list.save();

      res.status(200).json({
        message: "List updated successfully",
        list,
      });
    } else {
      res.status(404).json({
        message: "List not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

exports.getLists = async (req, res) => {
  const { uid } = req.params;

  try {
    const lists = await List.find({ userId: uid });
    if (lists.length > 0) {
      res.status(200).json({
        message: "Lists fetched successfully",
        lists,
      });
    } else {
      res.status(404).json({
        message: "No lists found for this user",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching lists",
    });
  }
};

exports.getList = async (req, res) => {
  const { uid, listId } = req.params;

  try {
    const list = await List.findOne({ userId: uid, _id: listId });

    if (list) {
      res.status(200).json({
        message: "List fetched successfully",
        list,
      });
    } else {
      res.status(404).json({
        message: "List not found for this user",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching the list",
    });
  }
};

exports.deleteList = async (req, res) => {
  const { uid, listId } = req.params;

  try {
    const list = await List.findOneAndDelete({ userId: uid, _id: listId });

    if (list) {
      res.status(200).json({
        message: "List deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "List not found for this user",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while deleting the list",
    });
  }
};
