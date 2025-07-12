import React, { useEffect } from "react";
import { FaCrown, FaTrophy } from "react-icons/fa";
import useSound from "use-sound";
import clickSound from "/click.wav";
import victorySound from "/win.wav";
import "./GameOver.css";

const GameOver = ({ winner, onRestart }) => {
  const [playClick] = useSound(clickSound);
  const [playVictory] = useSound(victorySound, { volume: 0.8 });

  useEffect(() => {
    if (winner) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Play victory sound
      playVictory();

      // Speak after a short delay
      const speakTimeout = setTimeout(() => {
        const msg = new SpeechSynthesisUtterance(`${winner.name} is the Grand Winner!`);
        msg.lang = "en-IN";
        msg.pitch = 1;
        msg.rate = 0.95;
        window.speechSynthesis.speak(msg);
      }, 1000);

      return () => {
        clearTimeout(speakTimeout);
        window.speechSynthesis.cancel();
      };
    }
  }, [winner, playVictory]);

  const handleRestart = () => {
    playClick();
    onRestart();
  };

  return (
    <div className="game-over">
      <h1>
        <FaCrown style={{ color: "gold", marginRight: "10px" }} /> Game Over!
      </h1>
      <h2>
        <FaTrophy style={{ color: "orange", marginRight: "10px" }} />
        Winner : {winner?.name}
      </h2>
      <p>Survived the battle of minds and reached the final round!</p>

      <button className="restart-button" onClick={handleRestart}>
        🔁 Restart Game
      </button>
    </div>
  );
};

export default GameOver;
