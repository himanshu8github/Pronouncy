import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { fetchUserProgress } from "../services/progress";
import { fetchPracticeWords } from "../services/words";

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [words, setWords] = useState([]);
  const [inputText, setInputText] = useState("");
  const [recognizedText, setRecognizedText] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const loadProgress = async () => {
      if (user?.email) {
        try {
          const result = await fetchUserProgress(user.email);
          setProgress(result);
        } catch (err) {
          console.error("Failed to load progress", err);
        }
      }
    };
    loadProgress();
  }, [user]);

  useEffect(() => {
    const loadWords = async () => {
      try {
        const fetched = await fetchPracticeWords();
        setWords(fetched);
      } catch (err) {
        console.error("Failed to load words", err);
      }
    };
    loadWords();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleStartRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setRecognizedText(speechResult);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const speakText = () => {
    if (!inputText) return;
    const utterance = new SpeechSynthesisUtterance(inputText);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const getFeedback = () => {
    if (!inputText || !recognizedText) return "";
    return inputText.toLowerCase() === recognizedText.toLowerCase()
      ? " Good pronunciation!"
      : ` Try again. You said: "${recognizedText}"`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#370617] to-[#9d0208]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="text-xl font-bold text-[#c1121f]">Pronouncy</div>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-700 hover:text-[#d00000] font-medium transition">Home</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-[#d00000] font-medium transition">Dashboard</Link>
          <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium transition">Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center p-8">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-6 text-[#780000]">Welcome, {user?.email}!</h1>

          {/* Input Card */}
          <div className="bg-[#fef2f2] border border-[#c1121f] rounded p-6 mb-6 shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-[#d00000]">Enter a word or sentence to practice</h2>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g., chaos, mojito, The weather is nice"
              className="w-full px-4 py-2 border border-[#c1121f] rounded focus:outline-none focus:ring focus:ring-[#c1121f]"
            />

            <button
              onClick={speakText}
              className="mt-4 px-6 py-2 bg-[#c1121f] text-white rounded hover:bg-[#780000] transition"
            >
              🔊 Listen to Correct Pronunciation
            </button>
          </div>

          {/* Recording Card */}
          <div className="bg-[#f0fdf4] border border-[#780000] rounded p-6 mb-6 shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-[#780000]">Record your pronunciation</h2>
            <button
              onClick={handleStartRecording}
              className="px-6 py-2 bg-[#780000] text-white rounded hover:bg-[#370617] transition"
            >
              🎙️ Start Recording
            </button>

            {/* Feedback */}
            {recognizedText && (
              <div className="mt-4 text-md font-medium text-gray-700">
                {getFeedback()}
              </div>
            )}
          </div>

          {/* Progress Card */}
          {progress && (
            <div className="mt-8 bg-white rounded shadow p-6 border border-[#c1121f]">
              <h2 className="text-xl font-semibold mb-4 text-[#c1121f]">Your Progress</h2>
              <ul className="space-y-2 text-gray-700">
                <li>Practice Sessions: {progress.practiceSessions}</li>
                <li>Words Practiced: {progress.wordsPracticed}</li>
                <li>Accuracy: {progress.accuracy}%</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
