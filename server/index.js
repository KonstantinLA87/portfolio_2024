import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { botName, userJoin, formatMessage, getRoomUsers, userLeave, getCurrentUser } from "./utils.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    },
});

io.on("connection", (socket) => {
    console.log(`${socket.id} user is connected`);

    socket.on('disconnected', () => {
      console.log(`${socket.id} is disconnected`);
    })

    socket.on("joinRoom", (userData) => {
        const user = userJoin({ ...userData, id: socket.id });
        socket.join(user.room);
        socket.broadcast.to(user.room).emit("message", formatMessage(botName, `${user.username} вошел в чат`));

        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
        });
    });

    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit("message", formatMessage(botName, `${user.username} вышел из чата`));

            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });

    socket.on("chatMessage", (message) => {
        const user = getCurrentUser(socket.id);
        if (user) {
            io.to(user.room).emit("message", formatMessage(user.username, message));
        }
    });
});

httpServer.listen(4000, () => {
    console.log("Listening");
});
