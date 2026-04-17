import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../services/socket";
import CanvasBoard from "../components/CanvasBoard";

const RoomPage = () => {
  const { roomId } = useParams();

  useEffect(() => {
    socket.emit("join-room", roomId);
  }, [roomId]);

  return (
    <div>
      <CanvasBoard roomId={roomId} />
    </div>
  );
};

export default RoomPage;