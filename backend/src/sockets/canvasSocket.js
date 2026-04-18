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

    // Join Room
    socket.on("join-room", (roomId) => {
      socket.join(roomId);

      if (!roomUsers[roomId]) {
        roomUsers[roomId] = [];
      }

      roomUsers[roomId].push(socket.id);

      console.log(`User ${socket.id} joined ${roomId}`);
    });

    // Draw Event
    socket.on("draw", (data) => {
      const { roomId } = data;

      // Send to others (not sender)
    socket.to(roomId).emit("draw", data);
          });
          socket.on("update-shape", ({ roomId, shape, index }) => {
        socket.to(roomId).emit("update-shape", { shape, index });
    });

    socket.on("cursor-move", ({ roomId, x, y, userId }) => {
      socket.to(roomId).emit("cursor-move", { x, y, userId });
    });

    // Undo
    socket.on("undo", ({ roomId, userId }) => {
      socket.to(roomId).emit("undo", { userId });
    });

    // Redo
    socket.on("redo", ({ roomId, shapes }) => {
      socket.to(roomId).emit("redo", { shapes });
    });

    // Disconnect
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