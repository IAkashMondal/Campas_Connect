const express = require("express");
const ChatRouter = express.Router();
const { authorization } = require("../middleware/auth.middleware");
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require("../controller/chats.controller");
ChatRouter.route("/").get( fetchChats);
ChatRouter.route("/").post( accessChat);
ChatRouter.route("/group").post( createGroupChat);
ChatRouter.route("/rename").put(renameGroup);
ChatRouter.route("/groupremove").put( removeFromGroup);
ChatRouter.route("/groupadd").put( addToGroup);
module.exports={
    ChatRouter
}
