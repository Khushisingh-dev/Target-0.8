import React, { useEffect, useState } from "react";
import "./ScoreBoard.css";

const ScoreBoard = ({ players, round }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation only when round changes
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 500); // 500ms animation duration
    return () => clearTimeout(timeout);
  }, [round]); // Only fires when `round` changes

  return (
    <div className="scoreboard">
      <div className="scoreboard-header">
        <h3>Scoreboard</h3>
        <div className="round-count">Round {round}</div>
      </div>

      <div className="score-list">
        {players.map((player) => (
          <div key={player.id} className="score-item">
            <p>{player.name}</p>
            <p className={`
              ${player.isEliminated ? "eliminated" :
                player.score > 0 ? "positive" :
                  player.score < 0 ? "negative" : "neutral"
              }
              ${animate ? "score-change-animate" : ""}
            `}>
              {player.score}
            </p>

            {!player.isEliminated && player.score === -9 && (
              <div className="badge-container">
                <span className="badge at-risk">⚠️ At Risk</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
