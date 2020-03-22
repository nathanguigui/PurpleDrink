const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const {v4} = require("uuid");
const crypto = require('crypto');

const secret = "appsecret321";

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

const lobbies = [];

io.on("connection", socket => {
    console.log("New client connected");

    socket.on("createRoom", (playerName) => {
        const roomId = v4();
        const playerHash = crypto.createHash('sha256').update(secret).digest('base64');
        console.log("creating a room id: " + roomId);
        lobbies.push({
            roomId: roomId,
            players: [{
                socket: socket,
                playerName: playerName,
                playerHash: playerHash
            }],
            gameState: {}
        });
        socket.emit("roomCreated", {roomId: roomId, playerHash: playerHash})
    });

    socket.on("reconnectPlayer", (playerHash) => {
        let playerName = null;
        lobbies.forEach((lobby) => {
            lobby.players.forEach((player) => {
                if (player.playerHash === playerHash) playerName = player.playerName
            })
        });
        socket.emit("playerReconnected", playerName)
    });

    /*
      socket.on("sendAddPlayer", (player) => {
        console.log("new player added");
        io.emit("newPlayer", player);
      });*/

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
