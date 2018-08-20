var myCanvas = document.querySelector(".my-canvas");
var ctx = myCanvas.getContext("2d");

var levelOne = document.querySelector(".level");
levelOne.style.visibility = "hidden";

var match = document.querySelector("#match");
match.style.visibility = "hidden";

var arrows = document.querySelector(".arrows");
arrows.style.visibility = "hidden";

var startButton = document.querySelector("#startBtn");
var instructions = document.querySelector("#instructions");

startButton.onclick = function() {
  instructions.style.visibility = "hidden";
  startButton.style.visibility = "hidden";
  levelOne.style.visibility = "visible";
};

levelOne.onclick = function() {
  levelOne.style.visibility = "hidden";
  match.style.visibility = "visible";
  arrows.style.visibility = "visible";
};

var arrowImg = new Image();
arrowImg.src = "./images/down-arrow.png";

var arrowHeight = 100;
var arrowWidth = 1500;

function drawScene() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  arrowWidth -= 4;

  ctx.drawImage(arrowImg, arrowWidth, arrowHeight, 100, 100);

  requestAnimationFrame(function() {
    drawScene();
  });
}

drawScene();
