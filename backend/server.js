const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Autoriser toutes les connexions (modifie selon besoin)
    methods: ["GET", "POST"]
  }
});

app.use(cors());

let rooms = {}; // Stockage des rooms et joueurs

io.on("connection", (socket) => {
  console.log(`Nouvelle connexion: ${socket.id}`);

  socket.on("joinRoom", (roomCode, playerName) => {
    if (!rooms[roomCode]) rooms[roomCode] = [];
    rooms[roomCode].push({ id: socket.id, name: playerName });

    socket.join(roomCode);
    console.log(`${playerName} a rejoint la room ${roomCode}`);

    io.to(roomCode).emit("updatePlayers", rooms[roomCode]); // Met à jour la liste des joueurs
  });

  socket.on("sendMessage", (roomCode, message) => {
    io.to(roomCode).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    for (let room in rooms) {
      rooms[room] = rooms[room].filter((player) => player.id !== socket.id);
      io.to(room).emit("updatePlayers", rooms[room]);
    }
    console.log(`Utilisateur déconnecté: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
