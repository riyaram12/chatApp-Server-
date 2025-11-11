"use strict";
const mongoose = require("mongoose");

const notification = mongoose.model(
    "notification",
    new mongoose.Schema(
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            message: {
                type: String,
            },
            type: {
                type: String,
                default: "message",
            },
            isRead: {
                type: Boolean,
                default: false,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
        {
            timestamps: true,
            versionKey: false,
        }
    ),
    "notification"
);

module.exports = { notification };
