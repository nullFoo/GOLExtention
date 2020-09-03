var line1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0];
var line6 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line7 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line8 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line9 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line10 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line11 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line12 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line13 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line14 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line15 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var grid = [line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11, line12, line13, line14, line15];

var dieAmountMin = 1;
var dieAmmountMax = 4;
var reviveAmount = 3;

var tps = 5;

var paused = false;

var updateInterval;

window.onload = function () {

 canvasObj = document.getElementById('gamecanvas');
 canvasArea = canvasObj.getContext("2d");


 for (var x = 0; x < 15; x++) {
   for (var y = 0; y < 15; y++) {
     grid[x][y] = Math.floor(Math.random() * Math.floor(4));
   }
 }

 update();
 updateInterval = setInterval(update,1000/tps);

 addEvent(document, "keypress", function (e) {
    e = e || window.event;

    //Spacebar
    if(e.keyCode == 32) {
      //Pause
      paused = !paused;
      console.log(paused)

      if(paused) {
          canvasArea.beginPath();
          canvasArea.font = "30px serif";
          canvasArea.fillStyle = "white";
          canvasArea.fillText("||", 7.5, 25);
          clearInterval(updateInterval);
      }
      else {
          update();
          updateInterval = setInterval(update,1000/tps);
      }
    }

    //Arrpws
    if(e.keyCode == 39) {

    }
    else if(e.keyCode == 37) {

    }
  });

  function addEvent(element, eventName, callback) {
      if (element.addEventListener) {
          element.addEventListener(eventName, callback, false);
      } else if (element.attachEvent) {
          element.attachEvent("on" + eventName, callback);
      } else {
          element["on" + eventName] = callback;
      }
  }

}

function rgb(r,g,b) {
    return 'rgb(' + [(r||0),(g||0),(b||0)].join(',') + ')';
}

function getSurroundNumber(x, y) {
    //TODO: Fix this function for edge squares, for now its just setting to 0
    if(x == 0 || y == 0 || x == 14 || y == 14)
      return -1;

    //This is probably not the way to do it but I don't know a better way
    var amount = 0;
    if(grid[x+1][y] == 0)
      amount += 1;
    if(grid[x+1][y+1] == 0)
      amount += 1;
    if(grid[x+1][y-1] == 0)
      amount += 1;
    if(grid[x-1][y] == 0)
      amount += 1;
    if(grid[x-1][y+1] == 0)
      amount += 1;
    if(grid[x-1][y-1] == 0)
      amount += 1;
    if(grid[x][y-1] == 0)
      amount += 1;
    if(grid[x][y+1] == 0)
      amount += 1;

    return amount;
}

// Main game loop
function update() {
canvasArea.clearRect(0, 0, canvasObj.width, canvasObj.height);


for (var x = 0; x < 15; x++) {
  for (var y = 0; y < 15; y++) {

    if(getSurroundNumber(x, y) == -1) {
      grid[x][y] = -1;
    }
    else if(getSurroundNumber(x, y) >= dieAmmountMax) {
        grid[x][y] = 1;
    }
    else if(getSurroundNumber(x, y) <= dieAmountMin) {
        grid[x][y] = 1;
    }
    else if(getSurroundNumber(x, y) == reviveAmount){
        grid[x][y] = 0;
    }

    canvasArea.beginPath();

    if(grid[x][y] == -1)
      canvasArea.fillStyle = "gray"
    else if(grid[x][y] == 0)
      canvasArea.fillStyle = "white";
    else
      canvasArea.fillStyle = "black"

    canvasArea.fillRect(x*30,y*30,29,29);

  }
}

}
