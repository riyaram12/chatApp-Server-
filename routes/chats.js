var express = require("express");
var router = express.Router();
const chatController = require("../controller/chatController");
const auth = require("../Middleware/auth.js");

router.post("/create", auth.authenticate, chatController.createChat);
router.get("/myChats", auth.authenticate, chatController.getMyChats);
router.post("/add-member", auth.authenticate, chatController.addMember);
router.post("/remove-member", auth.authenticate, chatController.removeMember);
router.post("/update", auth.authenticate, chatController.updateChat);
router.post("/getOrCreate", auth.authenticate, chatController.getOrCreateChat);
module.exports = router;
