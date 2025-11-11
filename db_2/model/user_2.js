"use strict";
const mongoose = require("mongoose");

const users = mongoose.model(
    "users",
    new mongoose.Schema(
        {
            userName: {
                type: String,
                index: true,
                unique: true,
                required: true,
            },

            email: {
                type: String,
                required: true,
                unique: true,
            },

            //hashed
            password: {
                type: String,
                required: true,
            },
            profilePic: {
                type: String,
                default: " ",
            },
            nickName: {
                type: String,
            },
            status: {
                type: String,
                enum: ["online", "offline", "busy"],
                default: "offline",
            },
            contacts: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user",
                    required: true,
                },
            ],
        },
        {
            timestamps: true,
            versionKey: false,
        }
    ),
    "users"
);

module.exports = { users };
