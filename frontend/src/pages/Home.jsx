import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Realtime Collaborative <br />
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Whiteboard
          </span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl">
          Draw, collaborate, and share ideas instantly with your team. No login required.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={handleCreateRoom}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 font-medium"
          >
            Create Room
          </button>

          <a
            href="#how"
            className="px-6 py-3 rounded-lg border border-gray-600 hover:bg-gray-800 transition"
          >
            How It Works
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold">About</h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          DrawSync is a realtime collaborative whiteboard that allows multiple users
          to draw, create shapes, and brainstorm ideas together in a shared space.
          No sign-up, no friction — just open and start creating.
        </p>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 px-6 bg-gray-900">
        <h2 className="text-3xl font-semibold text-center">Features</h2>

        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-black rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold">Realtime Sync</h3>
            <p className="text-gray-400 mt-2">
              See changes instantly as others draw and edit on the canvas.
            </p>
          </div>

          <div className="p-6 bg-black rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold">Infinite Canvas</h3>
            <p className="text-gray-400 mt-2">
              Pan and zoom freely without boundaries while creating.
            </p>
          </div>

          <div className="p-6 bg-black rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold">Drawing Tools</h3>
            <p className="text-gray-400 mt-2">
              Use pen, shapes, and more to express your ideas visually.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold">How It Works</h2>

        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold">1. Create Room</h3>
            <p className="text-gray-400 mt-2">
              Start a new whiteboard session instantly.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">2. Share Link</h3>
            <p className="text-gray-400 mt-2">
              Send the room link to your friends or team.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">3. Collaborate</h3>
            <p className="text-gray-400 mt-2">
              Draw and brainstorm together in realtime.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
