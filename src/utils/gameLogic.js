// Calculate average of array
export const calculateAverage = (numbers) => {
  const sum = numbers.reduce((acc, val) => acc + Number(val), 0);
  return sum / numbers.length;
};

// Target is 80% of average
export const calculateTarget = (avg) => {
  return parseFloat((avg * 0.8).toFixed(2));
};

// Calculate deviation from target
export const getDeviation = (number, target) => {
  return Math.abs(number - target).toFixed(2);
};

// Find closest player to target
export const findClosestPlayer = (players, target) => {
  let closestPlayer = null;
  let minDeviation = Infinity;

  players.forEach((player) => {
    const deviation = Math.abs(player.number - target);
    if (deviation < minDeviation) {
      minDeviation = deviation;
      closestPlayer = player;
    }
  });

  return closestPlayer;
};
