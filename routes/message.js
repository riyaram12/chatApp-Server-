var express = require("express");
var router = express.Router();
const messageController = require("../controller/messageController.js");
const auth = require("../Middleware/auth.js");

//router.post("/create", auth.authenticate, chatController.createChat);
router.post("/send", auth.authenticate, messageController.sendMessage);
router.get("/:chatId", auth.authenticate, messageController.getMessages);
//router.post("/status", auth.authenticate, messageController.updateStatus);
module.exports = router;
