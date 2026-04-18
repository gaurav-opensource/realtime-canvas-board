import { Server } from "socket.io";

let roomUsers = {}; // roomId -> [socketIds]

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join Room
    socket.on("join-room", (roomId) => {
      socket.join(roomId);

      // attach roomId to socket (important for disconnect)
      socket.roomId = roomId;

      if (!roomUsers[roomId]) {
        roomUsers[roomId] = [];
      }

      // avoid duplicate
      if (!roomUsers[roomId].includes(socket.id)) {
        roomUsers[roomId].push(socket.id);
      }

      console.log(`User ${socket.id} joined ${roomId}`);

      // SEND USER COUNT
      io.to(roomId).emit("room-users", {
        count: roomUsers[roomId].length,
      });
    });

    // Draw Event
    socket.on("draw", (data) => {
      socket.to(data.roomId).emit("draw", data);
    });

    // Update Shape (move/resize)
    socket.on("update-shape", ({ roomId, shape, index }) => {
      socket.to(roomId).emit("update-shape", { shape, index });
    });

    // Cursor Move
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

    // Clear Canvas
    socket.on("clear-canvas", ({ roomId }) => {
      socket.to(roomId).emit("clear-canvas");
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      const roomId = socket.roomId;

      if (roomId && roomUsers[roomId]) {
        roomUsers[roomId] = roomUsers[roomId].filter(
          (id) => id !== socket.id
        );

        if (roomUsers[roomId].length === 0) {
          delete roomUsers[roomId];
        } else {
          // UPDATE USER COUNT
          io.to(roomId).emit("room-users", {
            count: roomUsers[roomId].length,
          });
        }
      }
    });
  });

  return io;
};