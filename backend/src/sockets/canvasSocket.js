import { Server } from "socket.io";

let roomUsers = {}; // roomId -> [socketIds]

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // 🔥 Join Room
    socket.on("join-room", (roomId) => {
      socket.join(roomId);

      if (!roomUsers[roomId]) {
        roomUsers[roomId] = [];
      }

      roomUsers[roomId].push(socket.id);

      console.log(`User ${socket.id} joined ${roomId}`);
    });

    // 🎨 Draw Event
    socket.on("draw", (data) => {
      const { roomId } = data;

      // Send to others (not sender)
      socket.to(roomId).emit("draw", data);
    });

    // 🔁 Undo Event
    socket.on("undo", (data) => {
      const { roomId } = data;
      socket.to(roomId).emit("undo", data);
    });

    // 🔁 Redo Event
    socket.on("redo", (data) => {
      const { roomId } = data;
      socket.to(roomId).emit("redo", data);
    });

    // ❌ Disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // Remove user from rooms
      for (const roomId in roomUsers) {
        roomUsers[roomId] = roomUsers[roomId].filter(
          (id) => id !== socket.id
        );

        if (roomUsers[roomId].length === 0) {
          delete roomUsers[roomId];
        }
      }
    });
  });

  return io;
};