import React from "react";
import { FaBullseye, FaPlay } from "react-icons/fa";
import useSound from "use-sound"; // 1. Import useSound hook
import Instructions from "./Instructions";
import "./StartScreen.css";

const StartScreen = ({ onStart }) => {
  const [playClick] = useSound("/click.wav", { volume: 0.5 }); // 2. Hook for sound

  const handleStart = () => {
    playClick();    // 3. Play sound on button click
    onStart();      // 4. Trigger parent handler
  };

  return (
    <div className="start-screen">
      <h1>
        <FaBullseye className="target-icon" />
        Target 0.8
      </h1>
      <p className="subtitle">A Strategic Number Battle</p>

      <Instructions />

      <button className="start-game-btn" onClick={handleStart}>
        <FaPlay className="play-icon" /> Start Game
      </button>
    </div>
  );
};

export default StartScreen;
