"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Allow requests from this origin
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'], // Allow certain HTTP methods
    }
});
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Allow frontend to communicate
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
let messageHistory = [];
io.on("connection", (socket) => {
    console.log("A user connected");
    // Send initial message history to the new user
    socket.emit("initialMessages", messageHistory);
    // Handle new message
    socket.on("sendMessage", (message) => {
        messageHistory.push(message);
        io.emit("newMessage", message); // Send the new message to all users
    });
    // Handle disconnect
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});
server.listen(4000, () => {
    console.log("Server is running on port 4000");
});
