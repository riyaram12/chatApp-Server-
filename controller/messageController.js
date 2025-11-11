"use strict";
const messageServices = require("../services/messageServices.js");
const { Chat } = require("../db_2/model/chat");
const { notification } = require("../db_2/model/notifications.js"); // create this model below

const sendMessage = async (req, res) => {
    try {
        const { chatId, content } = req.body;
        console.log("chatId", chatId);

        const message = await messageServices.sendMessage(
            req.user._id,
            chatId,
            content
        );

        // 2. Get io and onlineUsers
        const io = req.app.get("io");
        const onlineUsers = req.app.get("onlineUsers");

        console.log("online users ::", onlineUsers);

        // 3. Find all chat users
        const chat = await Chat.findOne({ _id: chatId }).populate(
            "members",
            "_id"
        );
        console.log("chat", chat);

        // 4. Emit message to each participant if online

        chat.members.forEach(async (user, index) => {
            console.log("userID inside map", user._id);
            if (user._id.toString() === req.user._id.toString()) {
                console.log("INSIDE");
                return;
            }
            const socketId = await onlineUsers.get(user._id.toString());
            console.log();

            if (socketId) {
                io.to(socketId).emit("receive_message", message);
            } else {
                // Save as notification if user is offline
                await notification.create({
                    userId: user._id,
                    message: `${req.user.name} sent you a message`,
                    chatId,
                });
            }
            console.log("userId & socketId::", index, user._id, socketId);
        });

        return res.status(201).json({
            status: 1,
            message: "Message sent successfully",
            data: message,
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 0, message: e.message });
    }
};

const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await messageServices.getMessages(chatId);

        return res.status(200).json({
            status: 1,
            data: messages,
        });
    } catch (e) {
        return res.status(400).json({ status: 0, message: e.message });
    }
};

module.exports = { sendMessage, getMessages };
