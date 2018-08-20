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

levelOne.onclick = function() {
  levelOne.style.visibility = "hidden";
  match.style.visibility = "visible";
};

function Arrow(direction) {
  this.img = new Image();
  this.img.src = `./images/${direction}-arrow.png`;
  this.drawMe = () => {
    ctx.drawImage(this.img, arrowWidth, arrowHeight, 100, 100);
  };
}

var allArrows = [];
var down = new Arrow("down");
allArrows.push(down);

var up = new Arrow("up");
allArrows.push(up);

var left = new Arrow("left");
allArrows.push(left);

var right = new Arrow("right");
allArrows.push(right);

var arrowHeight = 100;
var arrowWidth = 1500;

console.log(allArrows);

function drawScene() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  arrowWidth -= 4;
  //ctx.drawImage(down.img, arrowWidth, arrowHeight, 100, 100);
  allArrows.forEach(function(el) {
    el.drawMe();
  });

  requestAnimationFrame(function() {
    drawScene();
  });
}

var matchCoord = match.getBoundingClientRect();
var leftX = matchCoord.left;
var rightX = matchCoord.right;
