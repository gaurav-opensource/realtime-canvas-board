import React from "react";
import {
  FaMousePointer,
  FaHandPaper,
  FaPen,
  FaSquare,
  FaCircle,
  FaSlash,
  FaEraser,
  FaUndo,
  FaRedo,
} from "react-icons/fa";

const tools = [
  { id: "select", icon: <FaMousePointer /> },
  { id: "hand", icon: <FaHandPaper /> },
  { id: "pen", icon: <FaPen /> },
  { id: "rect", icon: <FaSquare /> },
  { id: "circle", icon: <FaCircle /> },
  { id: "line", icon: <FaSlash /> },
];

const Toolbar = ({ tool, setTool, onUndo, onRedo }) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-md border shadow-lg">

        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={`w-9 h-9 flex items-center justify-center rounded-md ${
              tool === t.id
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.icon}
          </button>
        ))}

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <button
          onClick={onUndo}
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-200"
        >
          <FaUndo />
        </button>

        <button
          onClick={onRedo}
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-200"
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;