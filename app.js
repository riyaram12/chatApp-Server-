const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const db_2 = require("./db_2/dbinit").init();

require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const chatsRouter = require("./routes/chats");
const messageRouter = require("./routes/message");

const app = express();

const init = async (server) => {
    try {
        // Middleware
        app.use(cors());
        app.use(logger("dev"));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());

        // Routes
        app.use("/", indexRouter);
        app.use("/users", usersRouter);
        app.use("/chats", chatsRouter);
        app.use("/messages", messageRouter);

        // Catch 404
        app.use((req, res, next) => {
            next(createError(404));
        });

        if (server) {
            const { Server } = require("socket.io");
            const io = new Server(server, {
                cors: {
                    origin: "http://localhost:3000",
                    methods: ["GET", "POST"],
                },
            });

            //  Track online users
            const onlineUsers = new Map();
            app.set("io", io);
            app.set("onlineUsers", onlineUsers);

            io.on("connection", (socket) => {
                console.log("New client connected:", socket.id);

                // User registers themselves after login
                socket.on("register_user", (userId) => {
                    onlineUsers.set(userId, socket.id);
                    console.log(
                        `User ${userId} registered with socket ${socket.id}`
                    );
                });

                // socket.on("join_chat", (chatId) => {
                //     socket.join(chatId);
                //     console.log(`User joined chat ${chatId}`);
                // });

                // socket.on("send_message", (data) => {
                //     const { chatId, message } = data;
                //     io.to(chatId).emit("receive_message", message);
                // });

                socket.on("disconnect", () => {
                    console.log("Client disconnected:", socket.id);
                    // remove disconnected socket
                    for (const [userId, sId] of onlineUsers.entries()) {
                        if (sId === socket.id) {
                            onlineUsers.delete(userId);
                            break;
                        }
                    }
                });
            });
        }
    } catch (e) {
        console.log("error at init()::", e);
    }
};

module.exports = { app, init };
