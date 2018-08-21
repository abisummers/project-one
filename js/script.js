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
console.log(leftX, rightX);

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

var score = 0;
document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case 37:
      event.preventDefault();
      if (matched(matchBox, leftArrows)) {
        score += 10;
        console.log(score);
      }
      break;

    case 38:
      event.preventDefault();
      if (matched(matchBox, upArrows)) {
        score += 10;
        console.log(score);
      }
      break;

    case 39:
      event.preventDefault();
      if (matched(matchBox, rightArrows)) {
        score += 10;
        console.log(score);
      }
      break;

    case 40:
      event.preventDefault();
      if (matched(matchBox, downArrows)) {
        score += 10;
        console.log(score);
      }
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
