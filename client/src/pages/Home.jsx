import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { FaMicrophone, FaWaveSquare, FaUser } from "react-icons/fa";

const Home = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const footerRef = useRef(null);
  const navTitleRef = useRef(null);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: -60,
      opacity: 100,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(subtitleRef.current, {
      y: 30,
      opacity: 80,
      duration: 1,
      delay: 0.8,
    });

    gsap.from(navTitleRef.current, {
      scale: 0.8,
      opacity: 100,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          y: 80,
          opacity: 80,
          duration: 1.5,
          delay: 0.5 + index * 0.3,
          ease: "power3.out",
        });
      }
    });

    gsap.from(footerRef.current, {
      opacity: 80,
      y: 30,
      delay: 2.5,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#7b2cbf] shadow-lg">
        <h1
          ref={navTitleRef}
          className="text-3xl font-extrabold text-white tracking-wide"
        >
          Pronouncy
        </h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-[#c77dff] hover:bg-[#9d4edd] text-white px-4 py-2 rounded transition duration-300"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-[#7b2cbf] hover:bg-gray-100 px-4 py-2 rounded transition duration-300"
          >
            Signup
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-[#f3e5f5] via-[#f3d9fa] to-[#e0bbff] p-6 flex flex-col items-center">
        <h2
          className="text-5xl md:text-6xl font-extrabold text-center text-[#5a189a] mt-12 mb-4"
          ref={titleRef}
        >
          Pronouncy
        </h2>
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-center text-[#8d0801] mb-8"
        >
          Master Pronunciation with Real-Time Visual Feedback
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mb-16">
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
      <footer
        ref={footerRef}
        className="bg-[#5a189a] text-white text-center py-6 mt-auto"
      >
        <p className="mb-1">© 2025 Pronouncy. All rights reserved.</p>
        <div className="flex justify-center space-x-6 text-sm mb-2">
          <a
            href="https://twitter.com/yourhandle"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          <a href="mailto:himanshukakran8@gmail.com" className="hover:underline">
            Email
          </a>
          <a
            href="https://github.com/himanshu8"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
        <p className="text-xs animate-pulse text-gray-200">
          Built by Himanshu Choudhary · React · Tailwind · GSAP
        </p>
      </footer>
    </div>
  );
};

// FeatureCard using custom innerRef prop (not default ref)
const FeatureCard = ({ icon, title, description, innerRef }) => (
  <div
    ref={innerRef}
    className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-all hover:scale-105 hover:shadow-2xl duration-300"
  >
    <div className="text-[#7b2cbf] mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-[#5a189a]">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

export default Home;
