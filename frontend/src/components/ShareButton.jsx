import React, { useState } from "react";

const ShareButton = ({ roomId }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Safe link
  const link = roomId
    ? `${window.location.origin}/room/${roomId}`
    : "";

  const copyLink = () => {
    if (!link) return;

    navigator.clipboard.writeText(link);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      {/* Button (NO absolute here) */}
      <button
        onClick={() => setOpen(true)}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition"
      >
        🔗 Share
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[350px] shadow-xl">

            <h2 className="text-lg font-semibold mb-4 text-center">
              Share Link
            </h2>

            {/* Input */}
            <input
              type="text"
              value={link}
              readOnly
              className="w-full border px-3 py-2 rounded mb-3 text-sm"
            />

            {/* Copy */}
            <button
              onClick={copyLink}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              {copied ? "Copied ✅" : "Copy Link"}
            </button>

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="mt-3 w-full text-gray-500 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareButton;