// // server.js
// const http = require("http");
// const app = require("./app"); // Import Express app
// const { Server } = require("socket.io");

// const PORT = process.env.PORT || 5000;

// // Create HTTP server from app.js
// const server = http.createServer(app);

// // Setup Socket.IO
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000", // frontend URL
//         methods: ["GET", "POST"],
//     },
// });

// // Socket.IO events
// io.on("connection", (socket) => {
//     console.log("New client connected:", socket.id);

//     // Join a chat room
//     socket.on("join_chat", (chatId) => {
//         socket.join(chatId);
//         console.log(` User joined chat ${chatId}`);
//     });

//     // Send & broadcast message
//     socket.on("send_message", (data) => {
//         const { chatId, message } = data;
//         io.to(chatId).emit("receive_message", message);
//     });

//     socket.on("disconnect", () => {
//         console.log(" Client disconnected:", socket.id);
//     });
// });

// // Start server
// server.listen(PORT, () => {
//     console.log(` Server running at http://localhost:${PORT}`);
// });
