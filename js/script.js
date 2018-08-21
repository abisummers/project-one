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

var allArrows = [];
var down = new Arrow("down", 1500);
allArrows.push(down);

var up = new Arrow("up", 1800);
allArrows.push(up);

var left = new Arrow("left", 2000);
allArrows.push(left);

var right = new Arrow("right", 2200);
allArrows.push(right);

// var arrowHeight = 160;
// var arrowWidth = 1500;

console.log(allArrows);

function drawScene() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  //ctx.drawImage(down.img, arrowWidth, arrowHeight, 100, 100);
  allArrows.forEach(function(el) {
    // setInterval(function() {
    el.arrowWidth -= 2;
    el.drawMe();
    // }, 1000);
  });

  requestAnimationFrame(function() {
    drawScene();
  });
}

// img.onload = drawScene;

var matchCoord = match.getBoundingClientRect();
var leftX = matchCoord.left;
var rightX = matchCoord.right;

jQuery(function($) {
  $("#match").click(function(e) {
    console.log("clicked on div");
  });
});
