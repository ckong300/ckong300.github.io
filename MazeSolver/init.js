var blackBtn = document.getElementById("black")
var whiteBtn = document.getElementById("white")
var startBtn = document.getElementById("start")
var endBtn = document.getElementById("end")
var orangeBtn = document.getElementById("orange")
var greenBtn = document.getElementById("green")

var reset = document.getElementById("reset")
var update = document.getElementById("update")

var sizeInput = document.getElementById("size")

// sizeInput.value --> 10

blackBtn.addEventListener("click", ()=>{
	console.log("black button")
	PENCOLOR = 0
})

whiteBtn.addEventListener("click", ()=>{
	console.log("white button")
	PENCOLOR = 1
})

startBtn.addEventListener("click", ()=>{
	console.log("start button")
	PENCOLOR = 2
})

endBtn.addEventListener("click", ()=>{
	console.log("end button")
	PENCOLOR = 3
})

orangeBtn.addEventListener("click", ()=>{
	console.log("orange button")
	PENCOLOR = 5
})

greenBtn.addEventListener("click", ()=>{
	console.log("green button")
	PENCOLOR = 6
})

reset.addEventListener("click", ()=>{
	for ( let i = 0; i < mazeArr.length; i++ ) {
		for ( let j = 0; j < mazeArr[0].length; j++ ) {
			mazeArr[i][j] = 0
		}
	}
	cnt = 0
})

update.addEventListener("click", ()=>{
	if (!(isNaN(sizeInput.value))){
		cellSize = sizeInput.value
		cellsPerRow = Math.floor(screenW / cellSize)
		cellsPerCol = Math.floor(screenH / cellSize)

		//reset 2 array
		mazeArr = []
		for (let i = 0; i < cellsPerRow; i++) {
			mazeArr.push([])
			for (let k = 0; k < cellsPerCol; k++) {
				mazeArr[i].push(0)
			}
		}
	}
})

/**

1. code the reset button, when clicked upon the maze array all resets to 0

2. code the update button, when clicked will change the cell size variable from 
	script.js. you can access input element's value by doing sizeInput.value.



*/