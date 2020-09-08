var grid = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  []
]; //Add [] until its the length you want (15 in this case)

var dieAmountMin = 1;
var dieAmmountMax = 4;
var reviveAmount = 3;

var tps = 5;

var paused = false;

var updateInterval;

for (let i = 0; i < grid.length; i++) {
  grid[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //Add 0s until its the length you want
}

window.onload = function() {

  canvasObj = document.getElementById('gamecanvas');
  canvasArea = canvasObj.getContext("2d");


  for (var x = 0; x < grid.length - 1; x++) {
    for (var y = 0; y < grid.length - 1; y++) {
      grid[x][y] = Math.floor(Math.random() * Math.floor(4));
    }
  }

  update();
  updateInterval = setInterval(update, 1000 / tps);

  addEvent(document, "keydown", function(e) {
      e = e || window.event;

      //Spacebar
      if (e.keyCode == 32) {
        //Pause
        paused = !paused;

        if (paused) {
          canvasArea.beginPath();
          canvasArea.font = "30px serif";
          canvasArea.fillStyle = "white";
          canvasArea.fillText("||", 7.5, 25);
          clearInterval(updateInterval);
        } else {
          update();
          updateInterval = setInterval(update, 1000 / tps);
        }
      }

      if (paused) {
        canvasArea.beginPath();
        canvasArea.font = "30px serif";
        canvasArea.fillStyle = "white";
        canvasArea.fillText("||", 7.5, 25);
        clearInterval(updateInterval);
      } else {
        update();
        updateInterval = setInterval(update, 1000 / tps);
      }
    }

    //Arrows
    if (e.keyCode == 39) {
      if (paused)
        return;
      tps += 1;
      clearInterval(updateInterval);
      update();
      updateInterval = setInterval(update, 1000 / tps);
    } else if (e.keyCode == 37) {
      if (tps == 1 || paused)
        return;
      tps -= 1;
      clearInterval(updateInterval);
      update();
      updateInterval = setInterval(update, 1000 / tps);
    }

    //0
    if (e.keyCode == 48) {
      //Clear grid
      for (var i = 0; i < grid.length; i++) {
        grid[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //Add 0s until its the length you want
      }
    }

    //Backspace
    if (e.keyCode == 8) {
      //Randomise
      for (var x = 0; x < 15; x++) {
        for (var y = 0; y < 15; y++) {
          grid[x][y] = Math.floor(Math.random() * Math.floor(4));
        }
      }

      tps = 5;
      if (paused) {
        update();
        paused = true
        canvasArea.beginPath();
        canvasArea.font = "30px serif";
        canvasArea.fillStyle = "white";
        canvasArea.fillText("||", 7.5, 25);
        clearInterval(updateInterval);
      }
    }
  });

addEvent(document, "onclick", function(e) {
  console.log("clicc");
  grid[Math.floor(clientX / canvasObj.width)][0] = 1;
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

function rgb(r, g, b) {
  return 'rgb(' + [(r || 0), (g || 0), (b || 0)].join(',') + ')';
}

function getSurroundNumber(x, y) {
  if (x == 0 || y == 0 || x == 15 || y == 15)
    return -1;

  //This is probably not the way to do it but I don't know a better way
  var amount = 0;
  if (grid[x + 1][y] == 0)
    amount += 1;
  if (grid[x + 1][y + 1] == 0)
    amount += 1;
  if (grid[x + 1][y - 1] == 0)
    amount += 1;
  if (grid[x - 1][y] == 0)
    amount += 1;
  if (grid[x - 1][y + 1] == 0)
    amount += 1;
  if (grid[x - 1][y - 1] == 0)
    amount += 1;
  if (grid[x][y - 1] == 0)
    amount += 1;
  if (grid[x][y + 1] == 0)
    amount += 1;

  return amount;
}

// Main game loop
function update() {
  canvasArea.clearRect(0, 0, canvasObj.width, canvasObj.height);
  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid.length; y++) {

      if (getSurroundNumber(x, y) == -1) {
        grid[x][y] = -1;
      } else if (getSurroundNumber(x, y) >= dieAmmountMax) {
        grid[x][y] = 1;
      } else if (getSurroundNumber(x, y) <= dieAmountMin) {
        grid[x][y] = 1;
      } else if (getSurroundNumber(x, y) == reviveAmount) {
        grid[x][y] = 0;
      }

      canvasArea.beginPath();

      if (grid[x][y] == -1)
        canvasArea.fillStyle = "gray"
      else if (grid[x][y] == 0)
        canvasArea.fillStyle = "white";
      else
        canvasArea.fillStyle = "black"

      canvasArea.fillRect(x * 450 / grid.length, y * 450 / grid.length, (450 / grid.length) - 1, (450 / grid.length) - 1);

      canvasArea.font = "30px serif";
      canvasArea.fillStyle = "white";
      canvasArea.fillText(tps, canvasObj.width / 2, 25);

    }
  }

}