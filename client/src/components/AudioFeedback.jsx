import React, { useState, useRef } from "react";

const AudioFeedback = ({ targetWord }) => {
  const [recognizedText, setRecognizedText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript.trim().toLowerCase();
      setRecognizedText(spoken);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const compareWords = () => {
    if (!targetWord || !recognizedText) return null;

    return recognizedText === targetWord.toLowerCase()
      ? "✅ Perfect! Pronunciation matched."
      : `❌ You said: "${recognizedText}"`;
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded shadow text-center">
      <h3 className="font-bold text-gray-700 mb-2">
        Try pronouncing: <span className="text-blue-600">{targetWord}</span>
      </h3>
      <button
        onClick={startListening}
        disabled={isListening}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-3"
      >
        🎤 {isListening ? "Listening..." : "Start Recording"}
      </button>

      {recognizedText && (
        <div className="text-gray-800 mt-2">
          <p><strong>You said:</strong> {recognizedText}</p>
          <p className="mt-1">{compareWords()}</p>
        </div>
      )}
    </div>
  );
};

export default AudioFeedback;
