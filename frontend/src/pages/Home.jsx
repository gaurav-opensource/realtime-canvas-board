import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  // Create a new room and ensure userId exists
  const handleCreateRoom = () => {
    const roomId = Math.random().toString(36).slice(2, 8);
    console.log("CLICKED");

    let userId = localStorage.getItem("userId");

    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("userId", userId);
    }

    localStorage.setItem("lastRoomId", roomId);

    navigate(`/room/${roomId}`);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">

        {/* Background effects */}
        {/* Background effects */}
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full top-[-100px] pointer-events-none" />

        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-100px] pointer-events-none" />

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Think. Draw. <br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Collaborate in real time
          </span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl text-lg">
          A simple collaborative whiteboard to sketch ideas, brainstorm, and work together instantly.
        </p>

        <div className="mt-10 flex gap-4 flex-wrap justify-center">
          <button
            onClick={handleCreateRoom}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-lg font-medium cursor-pointer hover:scale-105 transition"
          >
            🚀 Start Drawing
          </button>

          <a
            href="#features"
            className="px-8 py-3 rounded-xl border border-gray-600 hover:bg-gray-800 transition"
          >
            Explore Features
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-gray-900">
        <h2 className="text-4xl font-bold text-center">
          Features
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="p-6 bg-black rounded-2xl border border-gray-800 hover:border-purple-500 transition">
            <h3 className="text-xl font-semibold">Realtime Sync</h3>
            <p className="text-gray-400 mt-3">
              Changes appear instantly for everyone in the room.
            </p>
          </div>

          <div className="p-6 bg-black rounded-2xl border border-gray-800 hover:border-blue-500 transition">
            <h3 className="text-xl font-semibold">Infinite Canvas</h3>
            <p className="text-gray-400 mt-3">
              Move freely and draw without limits.
            </p>
          </div>

          <div className="p-6 bg-black rounded-2xl border border-gray-800 hover:border-pink-500 transition">
            <h3 className="text-xl font-semibold">Drawing Tools</h3>
            <p className="text-gray-400 mt-3">
              Use pen, shapes, and more to express ideas visually.
            </p>
          </div>

        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold">How it works</h2>

        <div className="mt-16 grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">

          <div>
            <h3 className="text-xl font-semibold">1. Start</h3>
            <p className="text-gray-400 mt-2">
              Create a new board instantly.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">2. Share</h3>
            <p className="text-gray-400 mt-2">
              Send the link to others.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">3. Collaborate</h3>
            <p className="text-gray-400 mt-2">
              Draw together in real-time.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold">
          Ready to start?
        </h2>

        <button
          onClick={handleCreateRoom}
          className="mt-8 px-10 py-4 bg-gradient-to-r from-purple-500 to-blue-500 cursor-pointer rounded-xl text-lg font-medium hover:scale-105 transition"
        >
          Start Whiteboard 🚀
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default Home;