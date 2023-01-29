const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controller/message.controller");

const MessagerRouter = express.Router();

MessagerRouter.route("/:chatId").get(allMessages);
MessagerRouter.route("/").post(sendMessage);

module.exports = {
  MessagerRouter,
};
