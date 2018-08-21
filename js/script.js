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
  drawScene();
};

// levelOne.onclick = function() {
//   levelOne.style.visibility = "hidden";
//   match.style.visibility = "visible";
// };

function Arrow(direction, myArrowWidth) {
  this.arrrow = direction;
  this.img = new Image();
  this.img.src = `./images/${direction}-arrow.png`;
  this.arrowHeight = 160;
  this.arrowWidth = myArrowWidth;
  this.x = 100;
  this.y = 100;

  this.drawMe = () => {
    ctx.drawImage(this.img, this.arrowWidth, this.arrowHeight, this.x, this.y);
  };
}

var score = 0;

function check(arrows) {
  arrows.forEach(function(el) {
    if (el.arrowWidth < 354 && el.arrowWidth > 150) {
      score += 10;
    }
  });
}

var allArrows = [];

var downArrows = [];
var down = new Arrow("down", 1500);
downArrows.push(down);
allArrows.push(down);

var upArrows = [];
var up = new Arrow("up", 1800);
upArrows.push(up);
allArrows.push(up);

var leftArrows = [];
var left = new Arrow("left", 2100);
leftArrows.push(left);
allArrows.push(left);

var rightArrows = [];
var right = new Arrow("right", 2400);
rightArrows.push(right);
allArrows.push(right);

//allArrow is not defined
function drawScene() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  allArrows.forEach(function(el) {
    el.arrowWidth -= 6;
    el.drawMe();
  });

  requestAnimationFrame(function() {
    drawScene();
  });
}

var matchCoord = match.getBoundingClientRect();
var leftX = matchCoord.left;
var rightX = matchCoord.right;
console.log(leftX, rightX);

var matchBox = {
  x: leftX,
  y: rightX,
  width: 200,
  height: 200
};

function matched(box, img) {
  //console.log(img);
  return box.x + box.width <= img.x && box.x >= img.x + img.width;
}
//matched(matchBox, Arrow);

document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case 37:
      check(leftArrows);
      matched(matchBox, Arrow);
      console.log(Arrow);
      // if (matched(matchBox, Arrow) === leftArrows) {
      console.log("add 10 points");
      // }
      //console.log("left");
      break;

    case 38:
      check(upArrows);
      console.log("up clicked");
      break;

    case 39:
      check(rightArrows);
      console.log("right clicked");
      break;

    case 40:
      check(downArrows);
      console.log("down clicked");
      break;
  }
});

// function Arrow(direction, myArrowWidth) {
//   this.arrrow = direction;
//   this.img = new Image();
//   this.img.src = `./images/${direction}-arrow.png`;
//   this.arrowHeight = 160;
//   this.arrowWidth = myArrowWidth;
//   this.x = 100;
//   this.y = 100;
