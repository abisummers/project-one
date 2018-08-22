var myCanvas = document.querySelector(".my-canvas");
var ctx = myCanvas.getContext("2d");

// var lives = document.querySelector(".lives");
// lives.style.visibility = "hidden";

var match = document.querySelector("#match");
match.style.visibility = "hidden";

var startButton = document.querySelector("#startBtn");
var instructions = document.querySelector("#instructions");

startButton.onclick = function() {
  instructions.style.visibility = "hidden";
  startButton.style.visibility = "hidden";
  match.style.visibility = "visible";
  // lives.style.visibility = "visible";
  drawScene();
};

function Arrow(direction, offset) {
  isActive = true;
  this.arrrow = direction;
  this.img = new Image();
  this.img.src = `./images/${direction}-arrow.png`;
  this.y = 160;
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

function getRandomArrow() {
  var num = Math.floor(Math.random() * 4);
  console.log(num);

  var left = new Arrow("left", 2100);
  var left1 = new Arrow("left", 2700);
  var left2 = new Arrow("left", 3000);
  leftArrows.push(left, left1, left2);
  allArrows.push(left, left1, left2);

  var up = new Arrow("up", 1800);
  var up1 = new Arrow("up", 3900);
  upArrows.push(up, up1);
  allArrows.push(up, up1);

  var right = new Arrow("right", 2400);
  var right1 = new Arrow("right", 3600);
  rightArrows.push(right, right1);
  allArrows.push(right, right1);

  var down = new Arrow("down", 1500);
  var down1 = new Arrow("down", 3300);
  var down2 = new Arrow("down", 4200);
  downArrows.push(down, down1, down2);
  allArrows.push(down, down1, down2);
}

getRandomArrow();

console.log(leftArrows, upArrows, rightArrows, downArrows);

function drawScene() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  allArrows.forEach(function(el) {
    if (isActive) {
      el.x -= 6;
      el.drawMe();
    } else {
      gameOver.drawMe();
    }
  });

  requestAnimationFrame(function() {
    drawScene();
  });
}

var gameOver = {
  x: 500,
  y: 150,
  opacity: 0,
  drawMe: function() {
    //fade in the text with globalAlpha
    if (this.opacity < 1) {
      this.opacity += 0.01;
    }

    ctx.localAlpha = this.opacity;
    ctx.font = "180px Open Sans Condensed";
    ctx.fillStyle = "black";
    // ctx.fillText("Game Over", this.x, this.y);

    ctx.lineWidth = 2;
    ctx.fillStyle = "black";
    ctx.strokeText("Game Over", this.x, this.y);
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
console.log(matchBox);

function matched(box, arrows) {
  return arrows.some(
    arrow => box.x + box.width >= arrow.x + arrow.width && box.x <= arrow.x
  );
}

var scoreCounter = document.querySelector("#scores");
var score = 0;

var lives = 3;
var livesCounter = document.querySelector("#lives");

if (livesCounter === "GAME OVER") {
}

document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case 37:
      event.preventDefault();
      if (matched(matchBox, leftArrows)) {
        score += 10;
        scoreCounter.innerHTML = score;
      } else if (
        matched(matchBox, upArrows) ||
        matched(matchBox, rightArrows) ||
        matched(matchBox, downArrows)
      ) {
        if (lives === 0) {
          return (isActive = false);
        } else lives -= 1;
        livesCounter.innerHTML = lives;
      }
      break;

    case 38:
      event.preventDefault();
      if (matched(matchBox, upArrows)) {
        score += 10;
        scoreCounter.innerHTML = score;
      } else if (
        matched(matchBox, leftArrows) ||
        matched(matchBox, rightArrows) ||
        matched(matchBox, downArrows)
      ) {
        if (lives === 0) {
          return (isActive = false);
        } else lives -= 1;
        livesCounter.innerHTML = lives;
      }
      break;

    case 39:
      event.preventDefault();
      if (matched(matchBox, rightArrows)) {
        score += 10;
        scoreCounter.innerHTML = score;
      } else if (
        matched(matchBox, upArrows) ||
        matched(matchBox, leftArrows) ||
        matched(matchBox, downArrows)
      ) {
        if (lives === 0) {
          return (isActive = false);
        } else lives -= 1;
        livesCounter.innerHTML = lives;
      }
      break;

    case 40:
      event.preventDefault();
      if (matched(matchBox, downArrows)) {
        score += 10;
        scoreCounter.innerHTML = score;
      } else if (
        matched(matchBox, upArrows) ||
        matched(matchBox, rightArrows) ||
        matched(matchBox, leftArrows)
      ) {
        if (lives === 0) {
          return (isActive = false);
        } else lives -= 1;
        livesCounter.innerHTML = lives;
      }
      break;
  }
});
