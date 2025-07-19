// src/components/SpeechRecognition.jsx
import React, { useState, useRef } from "react";

const SpeechRecognitionComponent = ({ targetText }) => {
  const [recognizedText, setRecognizedText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Web Speech API not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  return (
    <div className="p-4 rounded shadow bg-white text-center max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Pronounce: "{targetText}"</h2>
      <button
        onClick={startListening}
        disabled={isListening}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🎤 {isListening ? "Listening..." : "Start Speaking"}
      </button>
      <div className="mt-4">
        <p className="text-sm">You said:</p>
        <p className="font-bold text-lg">{recognizedText}</p>
        <p className="mt-2 text-green-600 font-medium">
          {recognizedText.toLowerCase() === targetText.toLowerCase()
            ? "✅ Correct!"
            : recognizedText
            ? "❌ Try Again"
            : ""}
        </p>
      </div>
    </div>
  );
};

export default SpeechRecognitionComponent;
