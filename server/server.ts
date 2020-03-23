import {createHash} from "crypto";
import Lobby from "./types/Lobby";
import SendMessageData from "./types/sendMessage";
import Player from "./types/Player";

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const {v4} = require("uuid");

const secret = "appsecret321";
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();

app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

const lobbies: Array<Lobby> = [];

io.on("connection", socket => {
    console.log("New client connected");

    socket.on("createRoom", (playerName) => {
        const roomId = v4();
        const playerHash = createHash('sha256').update(secret).update(playerName).digest('base64');
        console.log("creating a room id: " + roomId);
        lobbies.push({
            roomId: roomId,
            players: [{
                socket: socket,
                playerName: playerName,
                playerHash: playerHash
            }],
            gameState: {},
            open: true
        });
        socket.emit("roomCreated", {roomId: roomId, playerHash: playerHash})
    });

    socket.on("reconnectPlayer", (data) => {
        let playerName = null;
        let foundLobby = null;
        lobbies.forEach((lobby) => {
            if (lobby.roomId === data.roomID) foundLobby = lobby;
            lobby.players.forEach((player) => {
                if (player.playerHash === data.playerHash) {
                    playerName = player.playerName;
                    player.socket = socket
                }
            })
        });
        if (!foundLobby) {
            socket.emit("lobbyNotFound");
            return;
        }
        socket.emit("playerReconnected", playerName);
        foundLobby.players.forEach((player) => {
            console.log("sending update to " + player.playerName);
            player.socket.emit("updatePlayerList", foundLobby.players.map((player) => player.playerName))
        })
    });

    socket.on("joinRoom", (data) => {
        console.log(data.playerName + " is trying to join room " + data.roomId);
        let playerHash = createHash('sha256').update(secret).update(data.playerName).digest('base64');
        let foundLobby = null;
        lobbies.forEach((lobby) => {
            if (lobby.roomId === data.roomId) {
                foundLobby = lobby;
                lobby.players.push({
                    socket: socket,
                    playerName: data.playerName,
                    playerHash: playerHash
                })
            }
        });
        if (!foundLobby) {
            socket.emit("lobbyNotFound");
            return;
        }
        socket.emit("joinSuccessful", {playerHash: playerHash});
        foundLobby.players.forEach((player) => {
            console.log("sending update to " + player.playerName);
            player.socket.emit("updatePlayerList", foundLobby.players.map((player) => player.playerName))
        })
    });

    socket.on("sendMessage", (data:SendMessageData) => {
        let foundLobby = null;
        lobbies.forEach((lobby) => {
            if (lobby.roomId === data.roomID)
                foundLobby = lobby
        });
        if (!foundLobby)
            return;
        foundLobby.players.forEach((player: Player) => {
            player.socket.emit("newMessage", {sender: data.sender, message: data.message})
        })
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
