import React from "react";
import "./Instructions.css";
import { FaInfoCircle } from "react-icons/fa";

const Instructions = () => {
  return (
    <div className="instructions">
      <h3>
        <FaInfoCircle style={{ marginRight: "8px" }} />
        How to Play
      </h3>
      <p>
        4 players enter a number between 0–100. The target is 80% of the average of all inputs.
        The player closest to the target has their score <strong>frozen</strong> (it doesn't change).
        All other players lose <strong>–1 point</strong>. If a player's score drops to <strong>–10</strong>,
        they are <strong>eliminated</strong>. The last player remaining wins the game.
      </p>

    </div>
  );
};

export default Instructions;
