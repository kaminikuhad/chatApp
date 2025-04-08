import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from 'cors';  // Import CORS middleware
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],        // Allow certain HTTP methods
  }
});
app.use(cors({
  origin: 'http://localhost:3000',  // Allow frontend to communicate
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
let messageHistory: { username: string; content: string }[] = [];

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
