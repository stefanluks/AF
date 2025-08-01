let maxScore = 5; // valor padrão
let leftScore = 0;
let rightScore = 0;
let canvas = document.getElementById("pongCanvas");
let ctx = canvas.getContext("2d");

let paddleHeight = 80;
let paddleWidth = 10;
let ballRadius = 7;

let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

let mode = 1; // 1 jogador por padrão
let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;

let maxScoreSelect = document.getElementById("maxScoreSelect");
maxScoreSelect.addEventListener("change", () => {
  maxScore = parseInt(maxScoreSelect.value);
  restartGame();
});

function draw() {
  // fundo
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // raquetes
  ctx.fillStyle = "red";
  ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

  // bola
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
  // placar
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText(leftScore, canvas.width / 4, 40);//pontuação da esquerda
  ctx.fillText(rightScore, (canvas.width * 3) / 4, 40);//pontuação da direita
}

function move() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // colisão com topo/baixo
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY *= -1;
  }

  // colisão com raquete direita
  if (ballX - ballRadius < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
    ballSpeedX *= -1;
  }

  // colisão com raquete esquerda
  if (ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
    ballSpeedX *= -1;
  }

  // ponto marcado
  if (ballX < 0) {
    rightScore++; // jogador da esquerda marca ponto
    if (rightScore >= maxScore) {
      alert("Jogador da Direita venceu!");
      reiniciarjogo();
    }
    restartGame();
  } else if (ballX > canvas.width) {
    leftScore++; // jogador da direita marca ponto
    if (leftScore >= maxScore) {
      alert("Jogador da Esquerda venceu!");
      reiniciarjogo();
    }
    restartGame();
  }
  else if (ballX > canvas.width) {
    leftScore++;
    restartGame();
  }
  // movimento do jogador
  if (wPressed) leftPaddleY -= 5;
  if (sPressed) leftPaddleY += 5;

  if (mode === 2) {
    if (upPressed) rightPaddleY -= 5;
    if (downPressed) rightPaddleY += 5;
  } else {

    if (ballY > rightPaddleY + paddleHeight / 2) rightPaddleY += 3;
    else rightPaddleY -= 3;
  }

  // limites da tela
  leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddleY));
  rightPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddleY));
}

function gameLoop() {
  move();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") upPressed = true;
  if (e.key === "ArrowDown") downPressed = true;
  if (e.key === "w") wPressed = true;
  if (e.key === "s") sPressed = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") upPressed = false;
  if (e.key === "ArrowDown") downPressed = false;
  if (e.key === "w") wPressed = false;
  if (e.key === "s") sPressed = false;
});

function restartGame() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = 4;
  ballSpeedY = 4;
}
function reiniciarjogo() {
  window.location.reload(); // Recarrega a página para reiniciar o jogo
}
function setMode(selectedMode) {
  mode = selectedMode;
  leftScore = 0;
  rightScore = 0;
  restartGame();
}

gameLoop();

canvas.addEventListener("mousemove", (e) => {
  // Obtém a posição do mouse relativa ao canvas
  const rect = canvas.getBoundingClientRect();
  const mouseY = e.clientY - rect.top;

  // Centraliza a raquete na posição do mouse
  leftPaddleY = mouseY - paddleHeight / 2;

  // Limita a raquete dentro do canvas
  leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddleY));
});
function updateMaxScore() {
  const select = document.getElementById("maxScoreSelect");
  maxScore = parseInt(select.value);
  leftScore = 0;
  rightScore = 0;
  restartGame();
}
