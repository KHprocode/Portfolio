const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let playerScore = 0;
let aiScore = 0;

let ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    dx: 4,
    dy: -4,
    radius: 10,
    speed: 7
};

let paddle = {
    height: 10,
    width: 75,
    x: (canvas.width - 75) / 2
};

let aiPaddle = {
    height: 10,
    width: 75,
    x: (canvas.width - 75) / 2,
    speed: 4
};

let rightPressed = false;
let leftPressed = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawAiPaddle();
    drawScores();
    movePaddle();
    moveBall();
    moveAiPaddle();
    requestAnimationFrame(draw);
}

draw();

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function moveBall() {
    if(ball.x + ball.dx > canvas.width-ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if(ball.y + ball.dy < ball.radius) {
        if(ball.x > aiPaddle.x && ball.x < aiPaddle.x + aiPaddle.width) {
            let collidePoint = (ball.x - (aiPaddle.x + aiPaddle.width/2));
            collidePoint = collidePoint / (aiPaddle.width/2);
            let angleRad = (Math.PI/4) * collidePoint;
            let direction = (collidePoint < 0) ? -1 : 1;
            ball.dx = direction * ball.speed * Math.sin(angleRad);
            ball.dy = ball.speed * Math.cos(angleRad);
        }
        else {
            ball = { x: canvas.width / 2, y: canvas.height - 30, dx: 2, dy: -2, radius: 10, speed: 7 };
            aiScore += 1; // AI scores when the ball goes above the top edge of the canvas
        }
    }
    else if(ball.y + ball.dy > canvas.height-ball.radius) {
        if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            let collidePoint = (ball.x - (paddle.x + paddle.width/2));
            collidePoint = collidePoint / (paddle.width/2);
            let angleRad = (Math.PI/4) * collidePoint;
            let direction = (collidePoint < 0) ? -1 : 1;
            ball.dx = direction * ball.speed * Math.sin(angleRad);
            ball.dy = -ball.speed * Math.cos(angleRad);
        }
        else {
            ball = { x: canvas.width / 2, y: 30, dx: 2, dy: 2, radius: 10, speed: 7 };
            playerScore += 1; // Player scores when the ball goes below the bottom edge of the canvas
        }
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height-paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function movePaddle() {
    if(rightPressed && paddle.x < canvas.width-paddle.width) {
        paddle.x += 7;
    }
    else if(leftPressed && paddle.x > 0) {
        paddle.x -= 7;
    }
}

function drawAiPaddle() {
    ctx.beginPath();
    ctx.rect(aiPaddle.x, 0, aiPaddle.width, aiPaddle.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function moveAiPaddle() {
    let paddleMidpoint = aiPaddle.x + aiPaddle.width / 2;
    if(paddleMidpoint < ball.x) {
        aiPaddle.x += aiPaddle.speed;
    }
    else if(paddleMidpoint > ball.x) {
        aiPaddle.x -= aiPaddle.speed;
    }

    if(aiPaddle.x < 0) {
        aiPaddle.x = 0;
    }
    else if(aiPaddle.x + aiPaddle.width > canvas.width) {
        aiPaddle.x = canvas.width - aiPaddle.width;
    }
}

function drawScores() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Player: " + playerScore, 8, 20);
    ctx.fillText("AI: " + aiScore, canvas.width - 50, 20);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
