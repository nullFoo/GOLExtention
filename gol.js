// Load game
var grid = [[0,0,0], [1,1,0], [2,2,0], [3,3,0], [4,4,0], [5,5,0], [6,6,0], [7,7,0], [8,8,0], [9,9, 0]];
var startR = 2;
var AmountPerFrame = 4;
var GrowSpeed = 3;
window.onload = function () {

 canvasObj = document.getElementById('gamecanvas');
 canvasArea = canvasObj.getContext("2d");

 grid.forEach(x => {
    x[2] = Math.floor(Math.random() * Math.floor(2));;
});

 console.log(grid);

 setInterval(update,1000/100);


}


// Updates game
function update() {
canvasArea.clearRect(0, 0, canvasObj.width, canvasObj.height);

for (var x = 0; x < 10; x++) {
  for (var y = 0; y < 10; y++) {
    canvasArea.fillStyle = "FFFFFF";
    //TODO: Set color based off grid[x][2]

    canvasArea.fillRect(x*4,y*4,4,4);
  }
}

}
