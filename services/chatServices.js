const { Chat } = require("../db_2/model/chat.js");
const mongoose = require("mongoose");

function createChat(userId, members, isGroup, groupName) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!members || members.length === 0) {
                throw new Error("Members are required to create chat");
            }

            // include current user always
            if (!members.includes(userId.toString())) {
                members.push(userId);
            }

            // Decide if group or private based on members count
            let finalIsGroup = false;
            let finalGroupName = null;

            if (members.length > 2) {
                finalIsGroup = true;
                finalGroupName = groupName || "New Group";
            }

            const chat = new Chat({
                members,
                isGroup: isGroup || false,
                groupName: isGroup ? groupName : null,
            });

            await chat.save();
            return resolve(chat);
        } catch (e) {
            console.log("chatServices.createChat", e);
            reject(e);
        }
    });
}
function getMyChats(userId) {
    try {
        return Chat.find({ members: userId })
            .populate("members", "username email")
            .lean();
    } catch (e) {
        console.log("chatServices.getMyChats");
    }
}

function addMember(chatId, members) {
    return Chat.findByIdAndUpdate(
        chatId,
        { $addToSet: { members: members }, isGroup: true },
        { new: true }
    ).populate("members", "userName email");
}

async function removeMember(chatId, members) {
    try {
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            { $addToSet: { members: { $each: members } } }, //  $addToSet prevents duplicates
            { new: true }
        ).populate("members", "username email");

        if (!chat) throw new Error("Chat not found");
        return chat;
    } catch (e) {
        console.log("chatServices.removeMember", e);
        throw e;
    }
}
async function updateChat(chatId, updates) {
    try {
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            { $set: updates },
            { new: true }
        ).populate("members", "username email");

        if (!chat) throw new Error("Chat not found");
        return chat;
    } catch (e) {
        console.log("chatServices.updateChat", e);
        throw e;
    }
}

async function getOrCreateChatService(currentUserId, userId) {
    // Check if chat exists
    let chat = await Chat.findOne({
        isGroup: false,
        members: { $all: [currentUserId, userId] },
    }).populate("members", "username profilePic");

    // If not, create a new chat
    if (!chat) {
        chat = await Chat.create({
            isGroup: false,
            members: [currentUserId, userId],
        });
        chat = await Chat.findById(chat._id).populate(
            "members",
            "username profilePic"
        );
    }

    return chat;
}

module.exports = {
    createChat,
    getMyChats,
    addMember,
    removeMember,
    updateChat,
    getOrCreateChatService,
};
