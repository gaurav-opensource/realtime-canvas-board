
import React, { useRef, useEffect, useState } from "react";
import { socket } from "../services/socket";

const CanvasBoard = ({ roomId }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Receive drawing from others
    socket.on("draw", (data) => {
      drawLine(ctx, data.x0, data.y0, data.x1, data.y1, data.color);
    });

    return () => socket.off("draw");
  }, []);

  const drawLine = (ctx, x0, y0, x1, y1, color) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();
  };

  let lastX = 0;
  let lastY = 0;

  const startDrawing = (e) => {
    setIsDrawing(true);
    lastX = e.nativeEvent.offsetX;
    lastY = e.nativeEvent.offsetY;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    // Draw locally
    drawLine(ctx, lastX, lastY, x, y, "white");

    // Emit to others
    socket.emit("draw", {
      roomId,
      x0: lastX,
      y0: lastY,
      x1: x,
      y1: y,
      color: "white",
    });

    lastX = x;
    lastY = y;
  };

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="bg-black"
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseMove={draw}
      onMouseLeave={stopDrawing}
    />
  );
};

export default CanvasBoard;