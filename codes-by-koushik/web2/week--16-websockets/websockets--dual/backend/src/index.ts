import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let clientSocket1: any = null;
let clientSocket2: any = null;

wss.on("connection", (socket) => {
  console.log("User Connected By Koushik");
  if (clientSocket1 === null) {
    clientSocket1 = socket;
    console.log("1st client connected");
    clientSocket1.on("message", (data: any) => {
      if (clientSocket2 != null) {
        const messageFromClient = data.toString("utf-8");
        clientSocket2.send(messageFromClient);
      }
    });
    clientSocket1.on("close", () => {
      console.log("I lost a client1");
      clientSocket1 = null;
    });
  } else if (clientSocket2 === null) {
    clientSocket2 = socket;
    console.log("2nd client connected");
    clientSocket2.on("message", (data: any) => {
      if (clientSocket1 != null) {
        const messageFromClient = data.toString("utf-8");
        clientSocket1.send(messageFromClient);
      }
    });
    clientSocket2.on("close", () => {
      console.log("I lost a client2");
      clientSocket2 = null;
    });
  } else {
    console.log("Chat room is full! Only 2 users allowed.");
    socket.close();
  }
  socket.on("error", console.error);
});
