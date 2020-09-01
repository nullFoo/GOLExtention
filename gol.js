var line1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line6 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line7 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line8 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line9 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var line10 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var grid = [line1, line2, line3, line4, line5, line6, line7, line8, line9, line10];

var startR = 2;
var AmountPerFrame = 4;
var GrowSpeed = 3;
window.onload = function () {

 canvasObj = document.getElementById('gamecanvas');
 canvasArea = canvasObj.getContext("2d");


 for (var x = 0; x < 10; x++) {
   for (var y = 0; y < 10; y++) {
     grid[x][y] = Math.floor(Math.random() * Math.floor(2));
   }
 }

//  grid.forEach(x => {
//     x[2] = Math.floor(Math.random() * Math.floor(2));;
// });

 setInterval(update,1000/100);


}

function rgb(r,g,b) {
    return 'rgb(' + [(r||0),(g||0),(b||0)].join(',') + ')';
}

function getSurroundNumber(x, y) {
  
}

// Updates game
function update() {
canvasArea.clearRect(0, 0, canvasObj.width, canvasObj.height);

for (var x = 0; x < 10; x++) {
  for (var y = 0; y < 10; y++) {
    canvasArea.beginPath();

    if(grid[x][y] == 0)
      canvasArea.fillStyle = "black";
    else
      canvasArea.fillStyle = "white"
    //TODO: Set color based off grid[x][2]

    canvasArea.fillRect(x*40,y*40,40,40);
  }
}

}
