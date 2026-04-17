import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              D
            </div>
            <h2 className="text-white text-lg font-semibold">DrawSync</h2>
          </div>
          <p className="mt-4 text-sm">
            A realtime collaborative whiteboard to draw, share and build ideas together instantly.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how" className="hover:text-white transition">How It Works</a>
        </div>

        {/* Social / Contact */}
        <div>
          <h3 className="text-white font-semibold mb-2">Connect</h3>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            GitHub
          </a>
          <p className="mt-4 text-sm">
            Built with ❤️ by You
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center py-4 border-t border-gray-800 text-sm">
        © {new Date().getFullYear()} DrawSync. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;