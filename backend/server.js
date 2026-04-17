import http from "http";
import app from "./src/app.js";
import { initSocket } from "./src/sockets/canvasSocket.js";

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO (separate file)
initSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});