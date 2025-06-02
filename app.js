const buttons = document.querySelectorAll(".game-button");
const choicesText = document.getElementById("choicesText");
const resultText = document.getElementById("resultText");
const scoreBoard = document.getElementById("scoreBoard");
const resetBtn = document.getElementById("resetBtn");

const choices = ["rock", "paper", "scissors"];
let userScore = 0;
let computerScore = 0;
let gameOver = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (!gameOver) handlePlayerMove(button.id);
  });
});

resetBtn.addEventListener("click", resetGame);

function handlePlayerMove(playerMove) {
  choicesText.innerText = `You chose ${capitalize(playerMove)}...`;
  disableButtons();

  // Simulate delay for computer's move
  setTimeout(() => {
    const computerMove = getComputerMove();
    const result = determineWinner(playerMove, computerMove);

    updateScores(result);
    updateUI(playerMove, computerMove, result);
    checkGameEnd();
    if (!gameOver) enableButtons();
  }, 800);
}

function getComputerMove() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(player, computer) {
  if (player === computer) return "tie";

  const rules = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
  };

  return rules[player] === computer ? "win" : "lose";
}

function updateScores(result) {
  if (result === "win") userScore++;
  else if (result === "lose") computerScore++;
}

function updateUI(playerMove, computerMove, result) {
  choicesText.innerText = `You chose ${capitalize(playerMove)} | Computer chose ${capitalize(computerMove)}`;
  
  if (result === "win") resultText.innerText = "You won this round!";
  else if (result === "lose") resultText.innerText = "Computer won this round!";
  else resultText.innerText = "It's a tie!";

  scoreBoard.innerText = `Your Score: ${userScore} | Computer Score: ${computerScore}`;
}

function checkGameEnd() {
  if (userScore === 5 || computerScore === 5) {
    gameOver = true;
    resultText.innerText = userScore === 5 ? "🎉 You won the game!" : "😞 Computer won the game!";
    resetBtn.classList.remove("hide");
    disableButtons();
  }
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  gameOver = false;
  choicesText.innerText = "Choose your move!";
  resultText.innerText = "";
  scoreBoard.innerText = `Your Score: 0 | Computer Score: 0`;
  resetBtn.classList.add("hide");
  enableButtons();
}

function disableButtons() {
  buttons.forEach(button => button.disabled = true);
}

function enableButtons() {
  buttons.forEach(button => button.disabled = false);
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
