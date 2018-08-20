//var myCanvas = document.querySelector(".my-canvas");
//var ctx = myCanvas.getContext("2d");

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
