import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const recognitionRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handlePlayPronunciation = () => {
    if (!inputText.trim()) return;
    const utterance = new SpeechSynthesisUtterance(inputText);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const handleStartRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      alert(`You said: "${spoken}"`);
    };

    recognition.onerror = (e) =>
      console.error("Speech recognition error:", e.error);

    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div className="min-h-screen bg-[#5a189a] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-[#7b2cbf] shadow-md">
        <div className="text-xl font-bold">Pronouncy</div>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-purple-100">Home</Link>
          <Link to="/dashboard" className="hover:text-purple-100">Dashboard</Link>
          <button onClick={handleLogout} className="hover:text-purple-200 text-red-200">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Card */}
      <div className="flex justify-center items-center px-4 py-12">
        <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-[#5a189a] mb-4">
            Welcome{user?.email ? `, ${user.email}` : ""}!
          </h2>

          <p className="mb-4 text-gray-700">
            Type a word or sentence below, listen to correct pronunciation, and try saying it aloud!
          </p>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g., chaos, mojito, The quick brown fox"
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-800 mb-4"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePlayPronunciation}
              className="flex-1 px-6 py-2 bg-[#9d4edd] text-white rounded hover:bg-[#7b2cbf] transition"
            >
              🔊 Listen to Correct Pronunciation
            </button>
            <button
              onClick={handleStartRecording}
              className="flex-1 px-6 py-2 bg-[#c77dff] text-white rounded hover:bg-[#9d4edd] transition"
            >
              🎙️ Start Recording
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
