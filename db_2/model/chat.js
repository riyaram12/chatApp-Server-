"use strict";
const mongoose = require("mongoose");
const user = require("../model/user.js");

const Chat = mongoose.model(
    "chats",
    new mongoose.Schema(
        {
            isGroup: {
                type: Boolean,
                default: false,
            },

            //array of user IDs who participate in the chat.
            members: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                },
            ],
            groupName: {
                type: String,
            },
            groupPic: {
                type: String,
                default: " ",
            },
        },
        {
            timestamps: true,
            versionKey: false,
        }
    ),
    "chats"
);

module.exports = { Chat };
