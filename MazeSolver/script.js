/*
Homework:
 - learn about the basics of javascript 
 - https://www.w3schools.com/js/default.asp
 - video: https://www.youtube.com/watch?v=qoSksQ4s_hg&list=PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET

 - grid 40 squares wide and 40 squares
 - squares are 20 pixels by 20 pixels

*/
var screenW = 600
var screenH = 600
var cellSize = 20 // 20 to 100
var cellsPerRow = Math.floor(screenW / cellSize)
var cellsPerCol = Math.floor(screenH / cellSize)
var PENCOLOR = 1
var ANIMATION = false

var mazeArr = []
for (let i = 0; i < cellsPerRow; i++) {
	mazeArr.push([])
	for (let k = 0; k < cellsPerCol; k++) {
		mazeArr[i].push(0)
	}
}

mazeArr[0][0] = 2 //start
mazeArr[9][9] = 3 //end

//setup is a special keyword that p5js will look up
function setup(){
	let myCanvas = document.getElementById("myCanvas")
	createCanvas(screenW,screenH, myCanvas )
}

function draw(){
	//background(120,120,120) //fills in background with certain color
	for (let i = 0; i < cellsPerRow; i++) {
		for (let k = 0; k < cellsPerCol; k++) {
			//Attempted to fill square based off of value in mazeArr for that cell
			noFill();
			if (mazeArr[k][i] == 0) { 
				fill(0, 0, 0);
			}else if (mazeArr[k][i] == 1){
				fill(255, 255, 255);
			}else if (mazeArr[k][i] == 2){//start :green
				fill(75, 200, 75);
			}else if (mazeArr[k][i] == 3){//end :red
				fill(230, 70, 70);
			}else if (mazeArr[k][i] == 4){ //visited
				fill(51, 153, 255);
			}else if (mazeArr[k][i] == 7){ // queued
				fill(0,255,255);
			}else if (mazeArr[k][i] == 5){ // orange mud
				fill(200, 125, 75);
			}else if (mazeArr[k][i] == 6){ // green grass
				fill(50, 175, 50);
			}else if (mazeArr[k][i] == 8){ // path / amber color
				fill(255, 191, 0);
			}
			stroke(140,140,140)
			strokeWeight(2)
			rect(0 + cellSize*k, 0 + cellSize*i, cellSize, cellSize)

		}
	}
}

function mouseDragged(){
	// console.log(mouseX,mouseY)
	// row is the y axis, col is the x axis
	if (ANIMATION){
		return
	}
	if (mouseX < 0 || mouseX > screenW || mouseY < 0 || mouseY > screenH){
		return
	}

	if (mazeArr[ Math.floor(mouseX / cellSize) ][ Math.floor(mouseY / cellSize) ] == 2 ){
		return
	}

	if (mazeArr[ Math.floor(mouseX / cellSize) ][ Math.floor(mouseY / cellSize) ] == 3 ){
		return
	}

	if (PENCOLOR == 2 || PENCOLOR == 3) {
		for (let i = 0; i < cellsPerRow; i++) {
			for (let j = 0; j < cellsPerCol; j++) {
				if (mazeArr[i][j] == PENCOLOR) {
					mazeArr[i][j] = 0
					break
				}
			}
		}
	}

	mazeArr[ Math.floor(mouseX / cellSize) ][ Math.floor(mouseY / cellSize) ] = PENCOLOR

}

function mouseReleased(){
	console.log("Released!!")
}