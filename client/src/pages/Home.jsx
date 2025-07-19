import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone, FaWaveSquare, FaUser } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-[#f3e5f5] via-[#f3d9fa] to-[#e0bbff]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#7b2cbf] shadow-lg">
        <h1 className="text-3xl font-extrabold text-white tracking-wide">Pronouncy</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-[#c77dff] text-white px-4 py-2 rounded shadow hover:bg-[#9d4edd] transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#c77dff] text-white px-4 py-2 rounded shadow hover:bg-[#9d4edd] transition"
          >
            Signup
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 p-6 flex flex-col items-center text-center mt-16 mb-12">
        <h2 className="text-5xl md:text-6xl font-extrabold text-[#5a189a] mb-4 animate-fade-in">
          Pronouncy
        </h2>
        <p className="text-lg md:text-xl text-[#8d0801] mb-10 max-w-2xl animate-slide-up">
          Master Pronunciation with Real-Time Visual Feedback
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full animate-fade-in-slow">
          <FeatureCard
            icon={<FaMicrophone size={32} />}
            title="Record Your Voice"
            description="Use your mic to practice pronunciation and hear how you sound."
          />
          <FeatureCard
            icon={<FaWaveSquare size={32} />}
            title="Visual Waveform"
            description="See a real-time waveform of your voice for better clarity."
          />
          <FeatureCard
            icon={<FaUser size={32} />}
            title="Track Progress"
            description="Login to save your speech history and monitor growth."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#5a189a] text-white text-center py-6 mt-auto text-sm">
        <p className="mb-2">© 2025 Pronouncy. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mb-2">
          <a
            href="https://x.com/himanshuu_5?t=OCSvQMQ7C8Oq9VrlPiWRdQ&s=08"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/himanshu-choudhary-1a19ba255/"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/himanshu8github"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a href="mailto:himanshukakran8@gmail.com" className="hover:underline">
            Email
          </a>
        </div>
        <p className="text-xs text-gray-300 animate-pulse">
          Built by Himanshu Choudhary · React · Tailwind CSS
        </p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transform hover:scale-105 transition duration-300">
    <div className="text-[#7b2cbf] mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-[#5a189a]">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

export default Home;
