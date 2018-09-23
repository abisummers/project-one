var myCanvas = document.querySelector(".my-canvas");
var ctx = myCanvas.getContext("2d");

var audio = new Audio("game-sound.mp3");
audio.loop = true;

var winner = new Audio("winner.mp3");
winnerSound = "inactive";

var gameOverSound = new Audio("game-over.mp3");
var gameOverSoundActive = "inactive";

var replay = document.querySelector(".replay");
replay.style.visibility = "hidden";

var match = document.querySelector(".match");
match.style.visibility = "hidden";

var startButton = document.querySelector(".startBtn");
var instructions = document.querySelector(".instructions");

function start() {
  instructions.style.visibility = "hidden";
  startButton.style.visibility = "hidden";
  match.style.visibility = "visible";
  audio.play();
  drawScene();
}

startButton.addEventListener("click", start);
replay.addEventListener("click", () => window.location.reload());

function Arrow(direction, offset) {
  this.direction = direction;
  this.img = new Image();
  this.img.src = `./images/${direction}-arrow.png`;
  this.y = 190;
  this.x = offset;
  this.width = 100;
  this.height = 100;

  this.drawMe = () => {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
}

var allArrows = [];
var downArrows = [];
var upArrows = [];
var leftArrows = [];
var rightArrows = [];

function generateArrows() {
  allArrows = [];
  downArrows = [];
  upArrows = [];
  leftArrows = [];
  rightArrows = [];

  var left = new Arrow("left", 2100);
  var left1 = new Arrow("left", 2700);
  var left2 = new Arrow("left", 3000);
  var left3 = new Arrow("left", 5100);
  leftArrows.push(left, left1, left2, left3);
  allArrows.push(left, left1, left2, left3);

  var up = new Arrow("up", 1800);
  var up1 = new Arrow("up", 3900);
  var up3 = new Arrow("up", 4500);
  var up4 = new Arrow("up", 4800);
  upArrows.push(up, up1, up3, up4);
  allArrows.push(up, up1, up3, up4);

  var right = new Arrow("right", 2400);
  var right1 = new Arrow("right", 3600);
  var right2 = new Arrow("right", 5400);
  rightArrows.push(right, right1, right2);
  allArrows.push(right, right1, right2);

  var down = new Arrow("down", 1500);
  var down1 = new Arrow("down", 3300);
  var down2 = new Arrow("down", 4200);
  downArrows.push(down, down1, down2);
  allArrows.push(down, down1, down2);
}

generateArrows();

const isOffScreen = arrow => arrow.x <= -1250;

function drawScene() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  if (lives === 0 || isOffScreen(allArrows[allArrows.length - 1])) {
    gameOver.drawMe();
    audio.pause();
    if (gameOverSoundActive !== "active") {
      gameOverSound.play();
      gameOverSoundActive = "active";
    }

    match.style.visibility = "hidden";
    replay.style.visibility = "visible";
    return;
  }

  if (score >= 200) {
    win.drawMe();
    audio.pause();
    if (winnerSound !== "active") {
      winner.play();
      winner = "active";
    }
    match.style.visibility = "hidden";
    replay.style.visibility = "visible";
  }

  allArrows.forEach(el => {
    el.x -= 4;
    el.drawMe();
  });

  requestAnimationFrame(drawScene);
}

var win = {
  x: 380,
  y: 160,
  opacity: 0,
  drawMe() {
    if (this.opacity < 1) {
      this.opacity += 0.01;
    }

    ctx.localAlpha = this.opacity;
    ctx.font = "180px Open Sans Condensed";
    ctx.fillStyle = "white";

    ctx.lineWidth = 2;
    ctx.fillStyle = "white";

    ctx.fillText("🔥 WINNER 🔥", this.x, this.y);
    ctx.gloabalAlpha = 1;
  }
};

var gameOver = {
  x: 350,
  y: 160,
  opacity: 0,
  drawMe() {
    if (this.opacity < 1) {
      this.opacity += 0.01;
    }

    ctx.localAlpha = this.opacity;
    ctx.font = "180px Open Sans Condensed";
    ctx.lineWidth = 2;
    ctx.fillStyle = "white";

    ctx.fillText("❌ YOU LOSE ❌", this.x, this.y);
    ctx.gloabalAlpha = 1;
  }
};

var matchCoord = match.getBoundingClientRect();
var leftX = matchCoord.left;
var rightX = matchCoord.right;

var matchBox = {
  x: leftX,
  y: rightX,
  width: 200,
  height: 200
};

function matched(box, arrows) {
  return arrows.some(
    arrow => box.x + box.width >= arrow.x + arrow.width && box.x <= arrow.x
  );
}

var scoreCounter = document.querySelector(".scores");
var score = 0;

var lives = 3;
var livesCounter = document.querySelector("#lives");

function correctKeyPress(points) {
  score += points;
  scoreCounter.innerHTML = score;
  match.style.borderColor = "green";
}

function incorrectKeyPress() {
  if (lives > 0) {
    lives -= 1;
    livesCounter.innerHTML = lives;
    match.style.borderColor = "red";
  }
}

document.addEventListener("keydown", event => {
  const directions = [
    { keyCode: 37, direction: "left" },
    { keyCode: 38, direction: "up" },
    { keyCode: 39, direction: "right" },
    { keyCode: 40, direction: "down" }
  ];

  const currentDirection = directions.find(
    ({ keyCode }) => keyCode === event.keyCode
  );

  if (currentDirection) {
    event.preventDefault();
    const correctArrows = allArrows.filter(
      ({ direction }) => currentDirection.direction === direction
    );
    if (matched(matchBox, correctArrows)) {
      correctKeyPress(10);
    } else {
      incorrectKeyPress();
    }
  }
});
