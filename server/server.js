const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected");

  socket.on("sendAddPlayer", (player) => {
    console.log("new player added");
    io.emit("newPlayer", player);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("startGame", () => {
    io.emit("gameStarted");
  })
});

server.listen(port, () => console.log(`Listening on port ${port}`));
