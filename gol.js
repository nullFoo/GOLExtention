// Load game
var circles = [];
var startR = 2;
var AmountPerFrame = 4;
var GrowSpeed = 3;
window.onload = function () {

 canvasObj = document.getElementById('gamecanvas');
 canvasArea = canvasObj.getContext("2d");
 setInterval(update,1000/100);


}

var circle = function(x,y,r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.growing = true;

    this.draw = function(){
        canvasArea.beginPath();
        canvasArea.arc(this.x,this.y,this.r,0,2*Math.PI);
        canvasArea.stroke();
    }
    this.grow = function(){

        for (var i = 0; i < circles.length;i++){
            if(this != circles[i]){
                a = this.x - circles[i].x;
                b = this.y - circles[i].y;
                if(Math.sqrt(a*a + b*b) - 2 < this.r + circles[i].r){
                    this.growing = false;
                }
            }
        }

        if(this.growing){
            this.r +=GrowSpeed;
        }

    }
}


// Updates game
function update() {
canvasArea.clearRect(0, 0, canvasObj.width, canvasObj.height);

for (var i = 0; i < AmountPerFrame;i++){
    newcircle();
}



 for (var i = 0; i < circles.length;i++){
    circles[i].draw();
    circles[i].grow();
 }
}

function newcircle(){
x = Math.floor(Math.random()*canvasObj.width);
y = Math.floor(Math.random() *canvasObj.height);
valid = true;

for (var i = 0; i < circles.length;i++){
    a = x - circles[i].x;
    b = y - circles[i].y;

    if(Math.sqrt(a*a + b*b) - startR < circles[i].r){
        valid = false;
    }

 }

 if(valid){
    circles.push(new circle(x,y,startR));
 }

}
