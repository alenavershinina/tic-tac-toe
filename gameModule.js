const WIN_POSITIONS = [[0,3,6], [1,4,7], [2,5,8], [0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6]];

let state = {
  board: ["","","","","","","","",""],
  active: "",
  winner: ""
};

const reset = () => {
  state.board = ["","","","","","","","",""];
  state.active = "";
  state.winner = "";
}

const start = () => {
  state.active = "X";
  state.winner = "notFinished";
}

//Randomly get XO or OX array
const getSigns = () => Math.random() < 0.5 ? ["X", "O"] : ["O", "X"];

const isTurnValid = (player, cell) => {
  let result = {valid: false};
  if (state.winner !== "notFinished") {
    result.message = "The game is finished!";
  } else if (player !== state.active) {
    result.message = "It's not your turn!";
  } else if (state.board[cell] !== "") {
    result.message = "The cell isn't free!";
  } else {
    result.valid = true;
  }
  return result;
};

const move = (player, cell) => {
    state.board[cell] = player;
    state.active = (player == "X" ? "O" : "X");
};

const checkWinner = (sign) => {
  const result = WIN_POSITIONS.some(indices => {
    return state.board[indices[0]] == sign
      && state.board[indices[1]] == sign
      && state.board[indices[2]] == sign;
  });
  return result;
};

const checkDraw = () => state.board.every(cell => cell !== "");

exports.state = state;
exports.reset = reset;
exports.move = move;
exports.getSigns = getSigns;
exports.isTurnValid = isTurnValid;
exports.checkWinner = checkWinner;
exports.checkDraw = checkDraw;
exports.start = start;
