import React from "react";
import useSound from "use-sound";
import clickSound from "/click.wav";
import "./PlayerInput.css";

const PlayerInput = ({ players, onInputChange, onSubmit }) => {
  const [playClick] = useSound(clickSound);

  const activePlayers = players.filter(p => !p.isEliminated);
  const allEntered = activePlayers.every(
    p =>
      p.number !== null &&
      p.number !== "" &&
      p.number >= 0 &&
      p.number <= 100
  );

  const handleSubmit = () => {
    playClick();
    onSubmit();
  };

  return (
    <div className="player-input-container">
      <div className="player-inputs">
        {players.map(player => {
          const isInvalid =
            player.number !== null &&
            (player.number < 0 || player.number > 100);

          return (
            <div
              key={player.id}
              className={`player-card ${player.isEliminated ? "disabled" : ""}`}
            >
              <p className="player-name">{player.name}</p>

              {player.isEliminated ? (
                <p className="eliminated-text">Eliminated</p>
              ) : (
                <>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={player.number ?? ""}
                    onChange={(e) =>
                      onInputChange(player.id, parseFloat(e.target.value))
                    }
                    placeholder="0 - 100"
                  />
                  {isInvalid && (
                    <p className="error-msg">{player.name}, must be ≤ 100.</p>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!allEntered}
      >
        Submit Round
      </button>
    </div>
  );
};

export default PlayerInput;
