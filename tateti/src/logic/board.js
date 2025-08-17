import { WINNER_COMBOS } from "../constants.js";

export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [first, second, third] = combo;

    if (
      boardToCheck[first] &&
      boardToCheck[first] === boardToCheck[second] &&
      boardToCheck[first] === boardToCheck[third]
    ) {
      return boardToCheck[first];
    }
  }
  return null;
};

export const checkEndGame = (boardToCheck) => {
  return boardToCheck.every((square) => square !== null);
};
