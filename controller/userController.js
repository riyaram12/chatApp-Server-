"use strict";

const { Socket } = require("socket.io");
const userServices = require("../services/userServices.js");

const createNewUser = async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        const user = await userServices.createNewUser(
            username,
            email,
            password,
            confirmPassword
        );
        console.log("user created ", username);
        return res.status(201).json({
            status: 1,
            statusCode: "SUCCESS",
            message: "User created successfully",
        });
    } catch (e) {
        console.log("error  at createNewUser", e);
        return res.status(400).json({
            status: 0,
            statusCode: "FAIL",
            message: e.message || e,
        });
    }
};

const LoginUser = async (req, res, next) => {
    try {
        const { username, password, socketId } = req.body;
        //const user = await userServices.LoginUser(username, password);

        // console.log("user created ", user);

        const result = await userServices.LoginUser(username, password);
        // console.log("result:", result);
        // get io & onlineUsers from app
        const io = req.app.get("io");
        const onlineUsers = req.app.get("onlineUsers");
        console.log("onlineuser::", onlineUsers);

        ///console.log("socketId", socketId);
        onlineUsers.set(result._id, socketId);
        console.log("onlineuser:::::::", onlineUsers);

        console.log(`User ${result._id} registered with socket ${socketId}`);

        return res.json({
            status: 1,
            statusCode: "SUCCESS",
            message: "User logged in successfully",
            data: { result, socketId },
        });
    } catch (e) {
        console.log("error  at LoginUser", e);
        return res.status(401).json({
            status: 0,
            statusCode: "FAIL",
            message: e.message || e,
        });
    }
};

const LogoutUser = async (req, res) => {
    try {
        const userId = req.user._id; // req.user comes from auth middleware (JWT decoded)
        const result = await userServices.LogoutUser(userId);

        return res.status(200).json({
            status: 1,
            statusCode: "SUCCESS",
            message: result.message,
        });
    } catch (e) {
        return res.status(500).json({
            status: 0,
            statusCode: "FAIL",
            message: e.message,
        });
    }
};

const getProfile = async (req, res, next) => {
    try {
        console.log(req);
        return res.status(200).json({
            status: 1,
            message: "Profile fetched successfully",
            user: req.user,
        });
    } catch (e) {
        console.log("error  at getProfile ", e);
        return res.status(500).json({ status: 0, message: e.message });
    }
};
const getAllUsers = async (req, res, next) => {
    try {
        const users = await userServices.getAllUsers();
        console.log("user::", users);
        return res.status(200).json({
            status: 1,
            statusCode: "SUCCESS",
            message: "Users fetched successfully",
            data: users,
        });
    } catch (e) {
        console.log("error at getAllUsers", e);
        return res.status(500).json({
            status: 0,
            statusCode: "FAIL",
            message: e.message || e,
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const deletedUser = await userServices.deleteUser(userId);

        return res.status(200).json({
            status: 1,
            message: "User deleted successfully",
        });
    } catch (e) {
        return res.status(500).json({
            status: 0,
            message: e.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const { username, email, password } = req.body;
        const updatedUser = await userServices.updateUser(
            userId,
            username,
            email,
            password
        );

        return res.status(200).json({
            status: 1,
            statusCode: "SUCCESS",
            message: "User updated successfully",
            data: updatedUser, // only username + status (from service)
        });
        //
    } catch (e) {
        return res.status(500).json({
            status: 0,
            message: e.message,
        });
    }
};

const searchUsers = async (req, res) => {
    try {
        const { query } = req.query; // example: /users/search?query=riya

        if (!query) {
            return res.status(400).json({
                status: 0,
                message: "Search query is required",
            });
        }

        const users = await userServices.searchUsers(query, req.user._id);

        return res.status(200).json({
            status: 1,
            statusCode: "SUCCESS",
            message: "Users fetched successfully",
            data: users,
        });
    } catch (e) {
        console.log("error at searchUsers", e);
        return res.status(500).json({
            status: 0,
            statusCode: "FAIL",
            message: e.message,
        });
    }
};

const getMe = async (req, res) => {
    try {
        // `req.user.id` should be set by your auth middleware after token verification
        const user = await userServices.getLoggedInUser(req.user.id);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Get logged-in user error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    createNewUser,
    LoginUser,
    getProfile,
    getAllUsers,
    deleteUser,
    updateUser,
    LogoutUser,
    searchUsers,
    getMe,
};
