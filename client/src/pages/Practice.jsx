import React, { useState } from "react";
import AudioFeedback from "../components/AudioFeedback";

const Practice = () => {
  const [word, setWord] = useState("");

  const handlePlay = () => {
    if (!word) return;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white p-8 rounded shadow-md max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Pronunciation Practice</h1>

        <input
          type="text"
          placeholder="Type a word (e.g. chaos, mojito)"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <div className="flex gap-4">
          <button
            onClick={handlePlay}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            🔊 Play
          </button>
        </div>

        {word && <AudioFeedback targetWord={word} />}
      </div>
    </div>
  );
};

export default Practice;
