"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const rooms = new Map();
/*
 PAYLOAD STRUCTURE :
{
"type" : "join/chat_message",
"roomCode" : "babaji ka thullu"
"text" : "Hi hkirat"
}
*/
wss.on("connection", (socket) => {
    console.log("User Connected By Koushik");
    socket.on("message", (data) => {
        const client_json = JSON.parse(data.toString());
        if (client_json.type === "join") {
            const roomCode = client_json.roomCode;
            if (!rooms.has(roomCode)) {
                rooms.set(roomCode, new Set());
            }
            rooms.get(roomCode).add(socket);
            socket.currentRoom = roomCode;
        }
        else if (client_json.type === "chat_message" && socket.currentRoom) {
            rooms.get(socket.currentRoom).forEach((client) => {
                if (client !== socket) {
                    client.send(client_json.text);
                }
            });
        }
    });
    socket.on("close", () => {
        const roomCode = socket.currentRoom;
        // Only cleanup if socket was actually in a room
        if (roomCode && rooms.has(roomCode)) {
            const roomSet = rooms.get(roomCode);
            roomSet.delete(socket);
            // Optional: Clean up empty rooms
            if (roomSet.size === 0) {
                rooms.delete(roomCode);
                console.log(`Room ${roomCode} deleted - no users left`);
            }
        }
        console.log("User disconnected");
    });
    socket.on("error", console.error);
});
/************************************************************************/
// import { WebSocketServer } from "ws";
// const wss = new WebSocketServer({ port: 8080 });
// let clientSocket1: any = null;
// let clientSocket2: any = null;
// wss.on("connection", (socket) => {
//   console.log("User Connected By Koushik");
//   if (clientSocket1 === null) {
//     clientSocket1 = socket;
//     console.log("1st client connected");
//     clientSocket1.on("message", (data: any) => {
//       if (clientSocket2 != null) {
//         const messageFromClient = data.toString("utf-8");
//         clientSocket2.send(messageFromClient);
//       }
//     });
//     clientSocket1.on("close", () => {
//       console.log("I lost a client1");
//       clientSocket1 = null;
//     });
//   } else if (clientSocket2 === null) {
//     clientSocket2 = socket;
//     console.log("2nd client connected");
//     clientSocket2.on("message", (data: any) => {
//       if (clientSocket1 != null) {
//         const messageFromClient = data.toString("utf-8");
//         clientSocket1.send(messageFromClient);
//       }
//     });
//     clientSocket2.on("close", () => {
//       console.log("I lost a client2");
//       clientSocket2 = null;
//     });
//   } else {
//     console.log("Chat room is full! Only 2 users allowed.");
//     socket.close();
//   }
//   socket.on("error", console.error);
// });
