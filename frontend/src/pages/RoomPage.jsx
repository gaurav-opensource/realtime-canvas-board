import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../services/socket";
import Toolbar from "../components/Toolbar";
import CanvasBoard from "../components/CanvasBoard";
import ShareButton from "../components/ShareButton";

const RoomPage = () => {
  const { roomId } = useParams();

  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");
  const [theme, setTheme] = useState("light");

  const canvasRef = useRef();

  useEffect(() => {
    socket.emit("join-room", roomId);
    return () => socket.off();
  }, [roomId]);

  return (
    <div className="w-full h-screen relative bg-gray-50">

      <Toolbar
        tool={tool}
        setTool={setTool}
        onUndo={() => canvasRef.current?.undo()}
        onRedo={() => canvasRef.current?.redo()}
      />

      <CanvasBoard
        ref={canvasRef}
        roomId={roomId}
        tool={tool}
        color={color}
        theme={theme}
      />

      <div className="absolute top-7 right-6 z-50">
        <ShareButton roomId={roomId} />
      </div>
    </div>
  );
};

export default RoomPage;