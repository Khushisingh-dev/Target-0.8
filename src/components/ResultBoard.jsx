import React, { useEffect, useRef } from "react";
import { getDeviation } from "../utils/gameLogic";
import "./ResultBoard.css";
import { FaTrophy, FaMedal } from "react-icons/fa";
import useSound from "use-sound";
import clickSound from "/click.wav";

const ResultBoard = ({
  round,
  players,
  winnerId,
  target,
  onNextRound,
  spokenEliminatedIds,
  setSpokenEliminatedIds,
  spokenWinnerId,
  setSpokenWinnerId
}) => {
  const [playClick] = useSound(clickSound);
  const spokenThisRoundRef = useRef(false);

  const winner = players.find(p => p.id === winnerId);
  const winnerName = winner?.name;

  const newlyEliminated = players.filter(
    p => p.isEliminated && !spokenEliminatedIds.includes(p.id)
  );
  useEffect(() => {
    if (spokenThisRoundRef.current) return;

    const messages = [];

    // Add winner announcement
    if (winnerId !== spokenWinnerId && winnerName) {
      messages.push({ text: `${winnerName} is winner`, type: "winner", id: winnerId });
    }

    // Add eliminated players announcement
    const newlyEliminated = players.filter(
      (p) => p.isEliminated && !spokenEliminatedIds.includes(p.id)
    );
    newlyEliminated.forEach((p) => {
      messages.push({ text: `${p.name} is eliminated`, type: "eliminated", id: p.id });
    });

    const speakAll = async () => {
      window.speechSynthesis.cancel();

      for (const item of messages) {
        await new Promise((resolve) => {
          const msg = new SpeechSynthesisUtterance(item.text);
          msg.lang = "en-IN";
          msg.rate = 0.95;
          msg.onend = resolve;
          window.speechSynthesis.speak(msg);
        });

        if (item.type === "winner") {
          setSpokenWinnerId(item.id);
        } else if (item.type === "eliminated") {
          setSpokenEliminatedIds((prev) => [...prev, item.id]);
        }
      }

      spokenThisRoundRef.current = true;
    };

    if (messages.length > 0) speakAll();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [players, winnerId, winnerName, spokenWinnerId, spokenEliminatedIds, setSpokenEliminatedIds, setSpokenWinnerId]);

  return (
    <div className="result-board">
      <h2>
        <FaTrophy style={{ color: "orange", marginRight: "8px" }} />
        Round {round} Winner : {winnerName}{" "}
      </h2>

      <p className="target">🏹 Target Number: <strong>{target}</strong></p>

      <div className="player-results">
        {players.map((player) => {
          const deviation =
            player.number !== null && !player.isEliminated
              ? getDeviation(player.number, target)
              : "--";

          return (
            <div
              key={player.id}
              className={`result-card ${player.id === winnerId ? "winner" : ""
                } ${player.isEliminated ? "eliminated" : ""}`}
            >
              <div className="name-row">
                <p className="player-name">{player.name}</p>
                {player.id === winnerId && (
                  <span className="win-badge"><FaMedal /> Winner</span>
                )}
              </div>
              <p>Submitted: {player.number !== null ? player.number : "—"}</p>
              <p>Deviation: {deviation}</p>
              <p
                className={`score-label ${player.score > 0 ? "green" : player.score < 0 ? "red" : ""
                  }`}
              >
                Score: {player.score}
              </p>
            </div>
          );
        })}
      </div>

      <button
        className="next-button"
        onClick={() => {
          playClick();
          spokenThisRoundRef.current = false; // ✅ Reset for next round
          onNextRound();
        }}
      >
        Next Round
      </button>
    </div>
  );
};

export default ResultBoard;
