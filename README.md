# 🎯 Target 0.8 – A Strategic Number Battle

A strategic multiplayer number game built with **React** where players compete by selecting numbers between 0–100. The player whose number is closest to **80% of the average** wins the round. Survive the rounds to become the ultimate champion!

---

## 🚀 Features

- 🎮 4-player turn-based strategy gameplay
- 📉 Dynamic scoring system with eliminations
- 🏆 Winner badges and animationed indicators
- 🔊 Sound effects for actions (Start, Submit, Next, Restart)
- ⚠️ Visual alerts for players close to elimination
- 💻 Responsive and interactive UI

---

## 🧠 Game Rules

- Each player chooses a number between **0–100**.
- The average of all selected numbers is calculated
- The **target** is **80% of that average**.
- The player whose number is **closest to the target** wins the round.
- ❌ All others lose 1 point
- 💀 A player is **eliminated** if their score drops to **-10**
- 🏆 The last remaining player wins the game
---

## 📁 Folder Structure

<pre> <code>src/
├── components/
│ ├── Header.jsx
│ ├── StartScreen.jsx
│ ├── Instructions.jsx
│ ├── PlayerInput.jsx
│ ├── ScoreBoard.jsx
│ ├── ResultBoard.jsx
│ └── GameOver.jsx
├── utils/
│ └── gameLogic.js
├── styles/
│ └── main.css
└── App.jsx </code> </pre>

## 👩‍💻 Developer
Khushi Singh</br>
Made with 💙 using React.js