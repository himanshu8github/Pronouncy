import React, { useState, useRef } from "react";

const PronunciationTrainer = () => {
  const [transcript, setTranscript] = useState("");
  const [accuracy, setAccuracy] = useState(null);
  const recognitionRef = useRef(null);

  const targetText = "The quick brown fox jumps over the lazy dog"; 

  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      calculateAccuracy(result, targetText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const calculateAccuracy = (spoken, expected) => {
    const sWords = spoken.toLowerCase().split(" ");
    const eWords = expected.toLowerCase().split(" ");
    const matches = sWords.filter((word, idx) => word === eWords[idx]);
    const score = (matches.length / eWords.length) * 100;
    setAccuracy(score.toFixed(2));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">Pronunciation Trainer</h2>
      <p className="mb-2">Target Sentence: <strong>{targetText}</strong></p>
      <button onClick={startRecognition} className="bg-blue-500 text-white px-4 py-2 rounded">
        Start Speaking
      </button>

      {transcript && (
        <div className="mt-4">
          <p><strong>You said:</strong> {transcript}</p>
          <p><strong>Accuracy:</strong> {accuracy}%</p>
        </div>
      )}
    </div>
  );
};

export default PronunciationTrainer;
