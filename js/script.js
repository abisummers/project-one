var myCanvas = document.querySelector(".my-canvas");
var ctx = myCanvas.getContext("2d");

var levelOne = document.querySelector(".level");
levelOne.style.visibility = "hidden";

var match = document.querySelector("#match");
// match.style.visibility = "hidden";

// var arrows = document.querySelector(".arrows");
// arrows.style.visibility = "hidden";

var startButton = document.querySelector("#startBtn");
var instructions = document.querySelector("#instructions");

startButton.onclick = function() {
  instructions.style.visibility = "hidden";
  startButton.style.visibility = "hidden";
  // levelOne.style.visibility = "visible";
  drawScene();
};

levelOne.onclick = function() {
  levelOne.style.visibility = "hidden";
  match.style.visibility = "visible";
  //arrows.style.visibility = "visible";
};

ctx.fillStyle = "orange";
ctx.strokeRect(100, 70, 150, 150);

var arrowImgDown = new Image();
arrowImgDown.src = "./images/down-arrow.png";

var arrowImgUp = new Image();
arrowImgUp.src = "./images/up-arrow.png";

var arrowImgLeft = new Image();
arrowImgLeft.src = "./images/left-arrow.png";

var arrowImgRight = new Image();
arrowImgRight.src = "./images/right-arrow.png";

var arrowHeight = 100;
var arrowWidth = 1500;

function drawScene() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  arrowWidth -= 4;

  ctx.drawImage(arrowImgDown, arrowWidth, arrowHeight, 100, 100);

  requestAnimationFrame(function() {
    drawScene();
  });
}

var matchCoord = match.getBoundingClientRect();
var leftX = matchCoord.left;
var rightX = matchCoord.right;

var imageCoord = arrowImgDown.getBoundingClientRect();
var imgLeftX = imageCoord.left;
var imgRightX = imageCoord.right;

document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 37:
      //arrowImgLeft
      break;

    case 38:
      //arrowImgUp
      break;

    case 39:
      //arrowImgRight
      break;

    case 40:
      //arrowImgDown
      break;
  }
};
