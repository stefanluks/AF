


// script.js
const canvas = document.getElementById('game');

canvas.width = 800;
canvas.height = 800;
const ctx = canvas.getContext('2d');

let gameover = false;

const box = 20;
let snake = [{ x: 19 * box, y: 19 * box }];
let direction = '';
let food = {
    x: Math.floor(Math.random() * 39) * box,
    y: Math.floor(Math.random() * 39) * box
};

document.addEventListener('keydown', updateDirection);

function updateDirection(event) {
    const key = event.key;
    console.log(key);
    
    if (key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (key === 'ArrowRight' && direction !== 'left') direction = 'right';
    if (key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (key === ' ' && gameover ) window.location.reload()
    if (key === 'Enter' && gameover ) window.location.reload()
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    

    // Desenha a cobrinha
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'lime' : 'green';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Desenha a comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Posição atual da cabeça
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === 'right') headX += box;
    if (direction === 'left') headX -= box;
    if (direction === 'up') headY -= box;
    if (direction === 'down') headY += box;

    // Verifica colisão com o corpo
    for (let i = 1; i < snake.length; i++) {
        if (headX === snake[i].x && headY === snake[i].y) {
            alert('Game Over!');
            clearInterval(game);
            return;
        }
    }

    // Verifica colisão com a parede
    if (
        headX < 0 || headX >= canvas.width ||
        headY < 0 || headY >= canvas.height 
    ) {
        document.body.innerHTML += `
        <div id="game-over">
        <h1>game over</h1>
        <button onclick="window.location.reload()">reiniciar</button>
        </div>`;

        gameover = true 

        clearInterval(game);

        return;
    }

    // Comeu a comida?
    if (headX === food.x && headY === food.y) {
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        }
    } else {
        snake.pop(); // Remove o último pedaço da cobra
    }

    const newHead = { x: headX, y: headY };
    snake.unshift(newHead);
}

// Executa o jogo a cada 100ms
const game = setInterval(drawGame, 150);
