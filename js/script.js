var myCanvas = document.querySelector(".my-canvas");
var ctx = myCanvas.getContext("2d");

var levelOne = document.querySelector(".level");
levelOne.style.visibility = "hidden";

var match = document.querySelector("#match");
match.style.visibility = "hidden";

var startButton = document.querySelector("#startBtn");
var instructions = document.querySelector("#instructions");

startButton.onclick = function() {
  instructions.style.visibility = "hidden";
  startButton.style.visibility = "hidden";
  match.style.visibility = "visible";
  //getRandomArrow();
  drawScene();
};

// levelOne.onclick = function() {
//   levelOne.style.visibility = "hidden";
//   match.style.visibility = "visible";
// };

function Arrow(direction, offset) {
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
// var down = new Arrow("down", 1500);
// downArrows.push(down);
// allArrows.push(down);

var upArrows = [];
// var up = new Arrow("up", 1800);
// upArrows.push(up);
// allArrows.push(up);

var leftArrows = [];
// var left = new Arrow("left", 2100);
// leftArrows.push(left);
// allArrows.push(left);

var rightArrows = [];
// var right = new Arrow("right", 2400);
// rightArrows.push(right);
// allArrows.push(right);

//console.log(leftArrows, upArrows, rightArrows, downArrows);

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
  // if (num === 0) {
  //   left = new Arrow("left", 2900);
  //   leftArrows.push(left);
  // }
  // if (num === 1) {
  //   up = new Arrow("up", 2900);
  //   upArrows.push(up);
  // }
  // if (num === 2) {
  //   right = new Arrow("right", 2900);
  //   rightArrows.push(right);
  // }
  // if (num === 3) {
  //   down = new Arrow("down", 2900);
  //   downArrows.push(down);
  // }
}

getRandomArrow();

console.log(leftArrows, upArrows, rightArrows, downArrows);

function drawScene() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  allArrows.forEach(function(el) {
    el.x -= 6;
    el.drawMe();
  });
  requestAnimationFrame(function() {
    drawScene();
  });
}

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

var scoreCounter = document.querySelector(".score");
var score = 0;

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
        score -= 10;
        scoreCounter.innerHTML = score;
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
        score -= 10;
        scoreCounter.innerHTML = score;
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
        score -= 10;
        scoreCounter.innerHTML = score;
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
        score -= 10;
        scoreCounter.innerHTML = score;
      }
      break;
  }
});
