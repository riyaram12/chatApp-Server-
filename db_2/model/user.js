"use strict";
const mongoose = require("mongoose");

const users = mongoose.model(
    "users",
    new mongoose.Schema(
        {
            username: {
                type: String,
                // index: true,
                // required: true,
            },

            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
            },

            //hashed
            password: {
                type: String,
                required: true,
            },

            profilePic: {
                type: String,
                default: "/default-avatar.png",
            },
            nickName: {
                type: String,
            },
            status: {
                type: String,
                enum: ["online", "offline", "busy", "hidden"],
                default: "offline",
            },
            // deleted: {
            //     type: Boolean,
            //     default: false,
            // },
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
