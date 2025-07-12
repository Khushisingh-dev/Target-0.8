import React, { useState, useEffect } from "react";
import "./styles/main.css";

import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import Instructions from "./components/Instructions";
import PlayerInput from "./components/PlayerInput";
import ScoreBoard from "./components/ScoreBoard";
import ResultBoard from "./components/ResultBoard";
import GameOver from "./components/GameOver";

import {
  calculateAverage,
  calculateTarget,
  findClosestPlayer,
} from "./utils/gameLogic";

const initialPlayers = [
  { id: 1, name: "Player 1", number: null, score: 0, wins: 0, hasWon: false, isEliminated: false },
  { id: 2, name: "Player 2", number: null, score: 0, wins: 0, hasWon: false, isEliminated: false },
  { id: 3, name: "Player 3", number: null, score: 0, wins: 0, hasWon: false, isEliminated: false },
  { id: 4, name: "Player 4", number: null, score: 0, wins: 0, hasWon: false, isEliminated: false },
];

const App = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [round, setRound] = useState(1);
  const [target, setTarget] = useState(null);
  const [winnerId, setWinnerId] = useState(null);
  const [screen, setScreen] = useState("start");

  const [spokenEliminatedIds, setSpokenEliminatedIds] = useState([]);
  const [spokenWinnerId, setSpokenWinnerId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  const handleStartGame = () => {
    setScreen("play");
  };

  const handleInputChange = (id, value) => {
    setPlayers(prev =>
      prev.map(p =>
        p.id === id ? { ...p, number: value } : p
      )
    );
  };

  const handleSubmitRound = () => {
    const activePlayers = players.filter(p => !p.isEliminated);
    const numbers = activePlayers.map(p => Number(p.number));
    const avg = calculateAverage(numbers);
    const tgt = calculateTarget(avg);
    const winner = findClosestPlayer(activePlayers, tgt);

    const updatedPlayers = players.map(p => {
      if (p.isEliminated) return p;

      if (p.id === winner.id) {
        return !p.hasWon
          ? { ...p, hasWon: true, wins: p.wins + 1, score: p.score }
          : p;
      } else {
        const newScore = p.score - 1;
        return {
          ...p,
          score: newScore,
          isEliminated: newScore <= -10
        };
      }
    });

    setPlayers(updatedPlayers);
    setTarget(tgt);
    setWinnerId(winner.id);
    setScreen("result");
  };


  const handleNextRound = () => {
    const alive = players.filter(p => !p.isEliminated);
    if (alive.length === 1) {
      setScreen("gameover");
    } else {
      setPlayers(prev => prev.map(p => ({ ...p, number: null })));
      setRound(prev => prev + 1);
      setSpokenWinnerId(null); // ✅ Reset for next round
      setScreen("play");
    }
  };

  const handleRestart = () => {
    setPlayers(initialPlayers);
    setRound(1);
    setTarget(null);
    setWinnerId(null);
    setSpokenEliminatedIds([]);  // ✅ Clear spoken history
    setSpokenWinnerId(null);     // ✅ Clear winner spoken
    setScreen("start");
  };

  return (
    <div className="app-container">
      {screen !== "start" && <Header />}

      {screen === "start" && (
        <div className="start-wrapper">
          <StartScreen onStart={handleStartGame} />
        </div>
      )}

      {screen === "play" && (
        <>
          <ScoreBoard players={players} round={round} />
          <Instructions />
          <PlayerInput
            players={players}
            onInputChange={handleInputChange}
            onSubmit={handleSubmitRound}
          />
        </>
      )}

      {screen === "result" && (
        <ResultBoard
          round={round}
          players={players}
          winnerId={winnerId}
          target={target}
          onNextRound={handleNextRound}
          spokenEliminatedIds={spokenEliminatedIds}
          setSpokenEliminatedIds={setSpokenEliminatedIds}
          spokenWinnerId={spokenWinnerId}
          setSpokenWinnerId={setSpokenWinnerId}
        />
      )}

      {screen === "gameover" && (
        <div className="gameover-wrapper">
          <GameOver
            winner={players.find(p => !p.isEliminated)}
            onRestart={handleRestart}
          />
        </div>
      )}

    </div>
  );
};

export default App;
