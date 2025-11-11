const { Message } = require("../db_2/model/message");
const { Chat } = require("../db_2/model/chat");

async function sendMessage(senderId, chatId, content) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!content) throw new Error("Message content required");

            const message = await Message.create({
                chatId,
                senderId,
                content,
            });

            // Populate senderId immediately after creation
            const populatedMessage = await message.populate(
                "senderId",
                "username email"
            );
            // update chat updatedAt
            await Chat.findByIdAndUpdate(chatId, {
                updatedAt: Date.now(),
            });

            return resolve(populatedMessage);
        } catch (e) {
            console.log("chatServices.createChat", e);
            reject(e);
        }
    });
}

async function getMessages(chatId) {
    return Message.find({ chatId })
        .populate("senderId", "username email")
        .sort({ createdAt: 1 });
}

module.exports = { sendMessage, getMessages };
