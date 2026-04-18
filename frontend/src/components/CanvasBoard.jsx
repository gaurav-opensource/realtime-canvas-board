import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { socket } from "../services/socket";
import { drawShape } from "./Shape";

const CanvasBoard = forwardRef(({ roomId, tool, color, theme }, ref) => {
  const canvasRef = useRef(null);
  const currentStrokeId = useRef(null);

  const userId = localStorage.getItem("userId");

  const [isDrawing, setIsDrawing] = useState(false);
  const [cursors, setCursors] = useState({});
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [previewShape, setPreviewShape] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const resizeHandle = useRef(null); // which corner

  const [selectedIndex, setSelectedIndex] = useState(null);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });

  const startPos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  const dpr = window.devicePixelRatio || 1;

  // CANVAS DPI
  useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      ctx.scale(dpr, dpr); 
  }, []);

  //DRAW
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // APPLY SCALE + DPR
    ctx.setTransform(scale * dpr, 0, 0, scale * dpr, offset.x, offset.y);

    history.forEach((shape) => drawShape(ctx, shape, scale));
    if (previewShape) drawShape(ctx, previewShape, scale);
  }, [history, previewShape, offset, scale]);

  // SOCKET
  useEffect(() => {

    // JOIN ROOM
    socket.on("room-users", ({ count }) => {
      setUserCount(count);
    });

    // RECEIVE DRAWINGS
    socket.on("draw", (data) => {
      setHistory((prev) => [...prev, data]);
    });

    // RECEIVE CURSOR MOVES
    socket.on("undo", ({ userId }) => {
      setHistory((prev) => {
        let lastStrokeId = null;
        for (let i = prev.length - 1; i >= 0; i--) {
          if (prev[i].userId === userId) {
            lastStrokeId = prev[i].strokeId;
            break;
          }
        }
        if (!lastStrokeId) return prev;

        return prev.filter(
          (s) => !(s.userId === userId && s.strokeId === lastStrokeId)
        );
      });
    });

    // CLEAR CANVAS
    socket.on("clear-canvas", () => {
      setHistory([]);
      setRedoStack([]);
    });

    // RECEIVE REDO
    socket.on("redo", ({ shapes }) => {
      if (!shapes) return;
      setHistory((prev) => [...prev, ...shapes]);
    });

    socket.on("update-shape", ({ shape, index }) => {
      setHistory((prev) => {
        const updated = [...prev];
        updated[index] = shape;
        return updated;
    });
    socket.on("cursor-move", ({ x, y, userId }) => {
      setCursors((prev) => ({
        ...prev,
        [userId]: { x, y },
      }));
     });
    });

    return () => {
      socket.off("draw");
      socket.off("undo");
      socket.off("redo");
      };
    }, []);

  // EXPOSE FUNCTIONS
  useImperativeHandle(ref, () => ({
    undo() {
      setHistory((prev) => {
        let lastStrokeId = null;

        for (let i = prev.length - 1; i >= 0; i--) {
          if (prev[i].userId === userId) {
            lastStrokeId = prev[i].strokeId;
            break;
          }
        }

        if (!lastStrokeId) return prev;

        const removed = prev.filter(
          (s) => s.userId === userId && s.strokeId === lastStrokeId
        );

        setRedoStack((r) => [...r, removed]);

        return prev.filter(
          (s) =>
            !(s.userId === userId && s.strokeId === lastStrokeId)
        );
      });

      socket.emit("undo", { roomId, userId });
    },

    redo() {
      if (redoStack.length === 0) return;

      const last = redoStack[redoStack.length - 1];

      setHistory((prev) => [...prev, ...last]);
      setRedoStack((prev) => prev.slice(0, -1));

      socket.emit("redo", { roomId, shapes: last });
    },
  }));

  const handleClear = () => {
  setHistory([]);
  setRedoStack([]);

  // realtime sync
  socket.emit("clear-canvas", { roomId });
};

  // EVENTS
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left - offset.x) / scale;
    const y = (e.clientY - rect.top - offset.y) / scale;

    if (tool === "select") {
      const rect = canvasRef.current.getBoundingClientRect();

      const x = (e.clientX - rect.left - offset.x) / scale;
      const y = (e.clientY - rect.top - offset.y) / scale;

      // find clicked shape
      const index = history.findIndex((s) => {
        return (
          x >= Math.min(s.x0, s.x1) &&
          x <= Math.max(s.x0, s.x1) &&
          y >= Math.min(s.y0, s.y1) &&
          y <= Math.max(s.y0, s.y1)
        );
     });

      if (index !== -1) {
        setSelectedIndex(index);
        lastPos.current = { x, y };
      } else {
        setSelectedIndex(null);
      }

      return;
    }

    if (tool === "hand") {
      isPanning.current = true;
      panStart.current = { x: e.clientX, y: e.clientY };
      return;
    }

    currentStrokeId.current = Date.now();
    startPos.current = { x, y };
    lastPos.current = { x, y };
    setIsDrawing(true);
  };




const handleMouseMove = (e) => {
  const rect = canvasRef.current.getBoundingClientRect();

  const x = (e.clientX - rect.left - offset.x) / scale;
  const y = (e.clientY - rect.top - offset.y) / scale;

  // MOVE (SELECT TOOL)
  if (tool === "select" && selectedIndex !== null) {
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;

    setHistory((prev) => {
      const updated = [...prev];
      const shape = updated[selectedIndex];

      shape.x0 += dx;
      shape.y0 += dy;
      shape.x1 += dx;
      shape.y1 += dy;

      // EMIT CORRECTLY
      socket.emit("update-shape", {
        roomId,
        index: selectedIndex,
        shape: { ...shape }, // important copy
      });

      return updated;
    });

    lastPos.current = { x, y };
    return;
  }

  // PAN
  if (tool === "hand" && isPanning.current) {
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;

    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    panStart.current = { x: e.clientX, y: e.clientY };
    return;
  }

  if (!isDrawing) return;

  // PEN (ONLY DRAW — NO update-shape)
  if (tool === "pen") {
    const shape = {
      tool: "pen",
      x0: lastPos.current.x,
      y0: lastPos.current.y,
      x1: x,
      y1: y,
      color,
      userId,
      strokeId: currentStrokeId.current,
    };

    setHistory((prev) => [...prev, shape]);

    socket.emit("draw", { roomId, ...shape }); 
    socket.emit("cursor-move", {
      roomId,
      x: e.clientX,
      y: e.clientY,
      userId,
    });

    lastPos.current = { x, y };
  } 
  // HAPES → PREVIEW ONLY
  else {
    setPreviewShape({
      tool,
      x0: startPos.current.x,
      y0: startPos.current.y,
      x1: x,
      y1: y,
      color,
      });
    }
  };

 const handleMouseUp = (e) => {
  isPanning.current = false;

  if (!isDrawing) return;

  const rect = canvasRef.current.getBoundingClientRect();

  const x = (e.clientX - rect.left - offset.x) / scale;
  const y = (e.clientY - rect.top - offset.y) / scale;

  if (tool === "select") {
    return;
  }

  // SAVE ONLY ONCE
  if (tool !== "pen") {
    const shape = {
      tool,
      x0: startPos.current.x,
      y0: startPos.current.y,
      x1: x,
      y1: y,
      color,
      userId,
      strokeId: currentStrokeId.current,
    };

    setHistory((prev) => [...prev, shape]);
    socket.emit("draw", { roomId, ...shape });
  }

    setPreviewShape(null);   // remove preview
    setRedoStack([]);
    setIsDrawing(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newScale = e.deltaY < 0 ? scale + 0.1 : scale - 0.1;
    const scaleRatio = newScale / scale;

    setOffset((prev) => ({
      x: mouseX - (mouseX - prev.x) * scaleRatio,
      y: mouseY - (mouseY - prev.y) * scaleRatio,
    }));

    setScale(Math.max(0.5, Math.min(newScale, 3)));
  };


  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 3)); // max zoom 3x
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.2)); // min zoom 0.2x
  };

  const resetZoom = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-full">

      {/* CANVAS */}
      <canvas
        ref={canvasRef}
        className={`${theme === "light" ? "bg-white" : "bg-black"} 
          ${
            tool === "hand"
              ? isPanning.current
                ? "cursor-grabbing"
                : "cursor-grab"
              : tool === "select"
              ? "cursor-default"
              : "cursor-crosshair"
          }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />

      {/* LIVE CURSORS */}
      {Object.entries(cursors).map(([id, pos]) => (
        <div
          key={id}
          style={{
            position: "absolute",
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 100,
          }}
        >
          🔴
        </div>
      ))}

      {/* CONTROLS (ZOOM + CLEAR) */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 z-50 bg-white/90 backdrop-blur-md border rounded-xl shadow px-2 py-1">

        {/* Zoom Out */}
        <button
          onClick={zoomOut}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200"
        >
          −
        </button>

        {/* Zoom % */}
        <span className="text-sm w-12 text-center">
          {(scale * 100).toFixed(0)}%
        </span>

        {/* Zoom In */}
        <button
          onClick={zoomIn}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200"
        >
          +
        </button>

        {/* Reset */}
        <button
          onClick={resetZoom}
          className="px-2 h-8 text-sm rounded-md hover:bg-gray-200"
        >
          Reset
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Clear */}
        <button
          onClick={handleClear}
          className="px-3 h-8 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          Clear
        </button>

      </div>

    </div>
  );
});

export default CanvasBoard;