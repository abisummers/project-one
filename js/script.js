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

startButton.onclick = function() {
  console.log("click");
  instructions.style.visibility = "hidden";
  startButton.style.visibility = "hidden";
  match.style.visibility = "visible";
  audio.play();
  drawScene();
};

replay.onclick = function() {
  window.location.href = "index.html";
};

function Arrow(direction, offset) {
  isActive = true;
  this.arrrow = direction;
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

function getRandomArrow() {
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

getRandomArrow();

function drawScene() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  if (allArrows[allArrows.length - 1].x <= -1250) {
    gameOver.drawMe();
    audio.pause();
    if (gameOverSoundActive !== "active") {
      gameOverSound.play();
      gameOverSound = "active";
    }

    match.style.visibility = "hidden";
    replay.style.visibility = "visible";
  }

  allArrows.forEach(function(el) {
    if (score >= 200) {
      win.drawMe();
      audio.pause();
      if (winnerSound !== "active") {
        winner.play();
        winner = "active";
      }
      match.style.visibility = "hidden";
      //replay.style.visibility = "visible";
    } else if (el === []) {
      gameOver.drawMe();
    } else if (isActive) {
      el.x -= 4;
      el.drawMe();
    } else {
      gameOver.drawMe();
      audio.pause();
      if (gameOverSoundActive !== "active") {
        gameOverSound.play();
        gameOverSound = "active";
      }
      match.style.visibility = "hidden";
      replay.style.visibility = "visible";
    }
  });

  requestAnimationFrame(function() {
    drawScene();
  });
}

var win = {
  x: 380,
  y: 160,
  opacity: 0,
  drawMe: function() {
    if (this.opacity < 1) {
      this.opacity += 0.01;
    }

    ctx.localAlpha = this.opacity;
    ctx.font = "180px Open Sans Condensed";
    ctx.fillStyle = "white";

    ctx.lineWidth = 2;
    ctx.fillStyle = "white";

    ctx.fillText("🔥WINNER🔥", this.x, this.y);
    ctx.gloabalAlpha = 1;
  }
};

var gameOverImg = new Image();
gameOverImg.src = "./images/game-over.gif";

var gameOver = {
  x: 350,
  y: 160,
  opacity: 0,
  drawMe: function() {
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

if (livesCounter === "GAME OVER") {
}

document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case 37:
      event.preventDefault();
      if (matched(matchBox, leftArrows) && score < 200) {
        score += 10;
        scoreCounter.innerHTML = score;
        match.style.borderColor = "green";
      } else if (
        matched(matchBox, upArrows) ||
        matched(matchBox, rightArrows) ||
        matched(matchBox, downArrows)
      ) {
        if (lives === 0) {
          return (isActive = false);
        } else lives -= 1;
        livesCounter.innerHTML = lives;
        match.style.borderColor = "red";
      }
      break;

    case 38:
      event.preventDefault();
      if (matched(matchBox, upArrows) && score < 200) {
        score += 10;
        scoreCounter.innerHTML = score;
        match.style.borderColor = "green";
      } else if (
        matched(matchBox, leftArrows) ||
        matched(matchBox, rightArrows) ||
        matched(matchBox, downArrows)
      ) {
        if (lives === 0) {
          return (isActive = false);
        } else lives -= 1;
        livesCounter.innerHTML = lives;
        match.style.borderColor = "red";
      }
      break;

    case 39:
      event.preventDefault();
      if (matched(matchBox, rightArrows) && score < 200) {
        score += 10;
        scoreCounter.innerHTML = score;
        match.style.borderColor = "green";
      } else if (
        matched(matchBox, upArrows) ||
        matched(matchBox, leftArrows) ||
        matched(matchBox, downArrows)
      ) {
        if (lives === 0) {
          return (isActive = false);
        } else lives -= 1;
        livesCounter.innerHTML = lives;
        match.style.borderColor = "red";
      }
      break;

    case 40:
      event.preventDefault();
      if (matched(matchBox, downArrows) && score < 200) {
        score += 10;
        scoreCounter.innerHTML = score;
        match.style.borderColor = "green";
      } else if (
        matched(matchBox, upArrows) ||
        matched(matchBox, rightArrows) ||
        matched(matchBox, leftArrows)
      ) {
        if (lives === 0) {
          return (isActive = false);
        } else lives -= 1;
        livesCounter.innerHTML = lives;
        match.style.borderColor = "red";
      }
      break;
  }
});
