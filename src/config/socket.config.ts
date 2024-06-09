import { Server } from "socket.io";
import http from "http";

let io: Server;

export const initializeSocket = (server: http.Server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("a user connected");

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });

        // Ajoutez ici d'autres gestionnaires d'événements socket
    });

    return io;
};

export const getSocketIO = () => {
    if (!io) {
        throw new Error("Socket.io is not initialized!");
    }
    return io;
};
