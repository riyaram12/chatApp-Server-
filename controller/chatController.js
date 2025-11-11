"use strict";
const chatServices = require("../services/chatServices.js");

const createChat = async (req, res) => {
    try {
        const { members, isGroup, groupName } = req.body;
        const creatorId = req.user._id; // from auth middleware

        const chat = await chatServices.createChat(
            creatorId,
            members,
            isGroup,
            groupName
        );

        return res.status(201).json({
            status: 1,
            message: "Chat created successfully",
            data: chat,
        });
    } catch (e) {
        return res.status(500).json({ status: 0, message: e.message });
    }
};

const getMyChats = async (req, res) => {
    try {
        const chats = await chatServices.getMyChats(req.user._id);
        return res.status(200).json({
            status: 1,
            message: "Chats fetched successfully",
            data: chats,
        });
    } catch (e) {
        return res.status(500).json({ status: 0, message: e.message });
    }
};

const addMember = async (req, res) => {
    try {
        const { chatId, members } = req.body;
        const chat = await chatServices.addMember(chatId, members);

        return res.status(200).json({
            status: 1,
            message: "Member added successfully",
            data: chat,
        });
    } catch (e) {
        return res.status(500).json({ status: 0, message: e.message });
    }
};

const removeMember = async (req, res) => {
    try {
        const { chatId, members } = req.body;

        if (!chatId || !members) {
            return res.status(400).json({
                status: 0,
                message: "chatId and members are required",
            });
        }

        const chat = await chatServices.removeMember(chatId, members);

        return res.status(200).json({
            status: 1,
            message: "Member removed successfully",
            data: chat,
        });
    } catch (e) {
        return res.status(400).json({
            status: 0,
            message: e.message,
        });
    }
};

const updateChat = async (req, res) => {
    try {
        const { chatId, groupName, groupPic } = req.body;

        if (!chatId) {
            return res.status(400).json({
                status: 0,
                message: "chatId is required",
            });
        }

        const updates = {};
        if (groupName) updates.groupName = groupName;
        if (groupPic) updates.groupPic = groupPic;

        const chat = await chatServices.updateChat(chatId, updates);

        return res.status(200).json({
            status: 1,
            message: "Chat updated successfully",
            data: chat,
        });
    } catch (e) {
        return res.status(400).json({
            status: 0,
            message: e.message,
        });
    }
};

const { getOrCreateChatService } = require("../services/chatServices");

const getOrCreateChat = async (req, res) => {
    const { userId } = req.body;
    const currentUserId = req.user._id;

    if (!userId)
        return res
            .status(400)
            .json({ status: 0, message: "User ID is required" });

    try {
        const chat = await getOrCreateChatService(currentUserId, userId);
        res.status(200).json({ status: 1, data: chat });
    } catch (err) {
        console.log("getOrCreateChat error:", err);
        res.status(500).json({ status: 0, message: err.message });
    }
};

// const searchChat = async (req, res) => {
//     try {
//     } catch (e) {}
// };
module.exports = {
    createChat,
    getMyChats,
    addMember,
    removeMember,
    updateChat,
    getOrCreateChat,
};
