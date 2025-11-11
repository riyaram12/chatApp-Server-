"use strict";
const mongoose = require("mongoose");

const contact = mongoose.model(
    "contact",
    new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        contacts: [
            {
                contact: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user",
                    required: true,
                },

                nickName: {
                    type: String,
                },
            },
        ],

        timestamps: true,
        versionKey: false,
    }),
    "contact"
);

module.exports = { contact };
