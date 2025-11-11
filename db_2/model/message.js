"use strict";
const mongoose = require("mongoose");
const user = require("../model/user.js");
const Chat = require("../model/chat.js");

const Message = mongoose.model(
    "messages",
    new mongoose.Schema(
        {
            chatId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "chats",
                required: true,
            },

            senderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
                required: true,
            },

            content: {
                type: String,
            },

            //link to media stored in S3/CDN if messageType is image/video/audio/file.
            mediaUrl: {
                type: String,
            },
            messageType: {
                type: String,
                enum: ["text", "image", "video", "audio"],
                default: "text",
            },
            status: {
                type: String,
                enum: ["sent", "delivered", "read"],
                default: "sent",
            },
        },
        {
            timestamps: true,
            versionKey: false,
        }
    ),
    "messages"
);

module.exports = { Message };
