import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { FaMicrophone, FaWaveSquare, FaUser } from "react-icons/fa";

const Home = () => {
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }

    // Cards animation
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 0.3 + index * 0.2,
          ease: "power3.out",
        });
      }
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-700">Pronouncy</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Signup
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-blue-100 to-blue-200 p-6 flex flex-col items-center">
        <h2
          className="text-4xl font-extrabold text-center text-blue-800 mt-12 mb-6"
          ref={titleRef}
        >
          Pronouncy: Master Pronunciation with Visual Feedback
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
          <FeatureCard
            innerRef={(el) => (cardRefs.current[0] = el)}
            icon={<FaMicrophone size={32} />}
            title="Record Your Voice"
            description="Use your mic to practice pronunciation and hear how you sound."
          />
          <FeatureCard
            innerRef={(el) => (cardRefs.current[1] = el)}
            icon={<FaWaveSquare size={32} />}
            title="Visual Waveform"
            description="See a real-time waveform of your voice for better clarity."
          />
          <FeatureCard
            innerRef={(el) => (cardRefs.current[2] = el)}
            icon={<FaUser size={32} />}
            title="Track Progress"
            description="(Optional) Login to save your speech history and monitor growth."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md text-center py-6 mt-auto">
        <div className="text-gray-700">
          <p className="mb-2">© 2025 Pronouncy. All rights reserved.</p>
          <div className="flex justify-center space-x-4 text-blue-600">
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a href="mailto:himanshukakran8@gmail.com">Email</a>
            <a href="https://github.com/himanshu8" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Built by Himanshu Choudhary · Frontend using React + Tailwind + GSAP
          </p>
        </div>
      </footer>
    </div>
  );
};

// FeatureCard using custom innerRef prop (not default ref)
const FeatureCard = ({ icon, title, description, innerRef }) => (
  <div
    ref={innerRef}
    className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition hover:scale-105 duration-300"
  >
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;
