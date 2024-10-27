var button = document.getElementById("solve")
button.addEventListener("click", solveMaze )

var algoselect = document.getElementById("algorithms")
/*

Define the solveMaze function, so that it'll convert maze into an
adjacency list Graph out of the 2D maze array.

graph = {
 key : [ <obj> ],
 key2 : [ <obj>]
}

graph[key] -> <obj>

*/

var FRAMES = []

class Tile{
	constructor(id, cost){
		this.id = id
		this.parent = null
		this.cost = cost
		this.dist2Goal = null         //H(n)
		this.stepsFromStart = null    //G(n)
	}
}

var TileObjs = {
	//0,0 : <Tile Obj>
}

var TileColors = {
	1 : 1,
	2 : 1,
	3 : 1,
	5 : 10, // mud 
	6 : 5 // grass
}

function solveMaze(){
	reset.disabled = true
	update.disabled = true
	ANIMATION = true

	var start
	var end
	var mazeList = {}

	for ( let i = 0; i < mazeArr.length; i += 1 ) {
		for ( let j = 0; j < mazeArr[0].length; j += 1 ) {
			if ( mazeArr[i][j] > 0 ) {

				TileObjs[[i, j]] = new Tile( [i,j] , TileColors[mazeArr[i][j]])

				mazeList[[i, j]] = []

				// check above 
				if ( i - 1 >= 0 && mazeArr[i - 1][j] != 0 ) {
					mazeList[[i, j]].push( [i - 1, j]  )
				}
				// check below 
				if ( i + 1 < mazeArr.length && mazeArr[i + 1][j] != 0 ) {
					mazeList[[i, j]].push( [i + 1, j] )
				}
				// check to the left 
				if ( j - 1 >= 0 && mazeArr[i][j - 1] != 0 ) {
					mazeList[[i, j]].push( [i, j - 1] )
				}
				// check to the right 
				if ( j + 1 < mazeArr.length && mazeArr[i][j + 1] != 0 ) {
					mazeList[[i, j]].push( [i, j + 1] )
				}
				// check for start
				if (mazeArr[i][j] == 2) {
					start = [i, j]
				}
				// check for end
				if (mazeArr[i][j] == 3) {
					end = [i, j]
				}
			}
		}
	}

	//endpoint = DFS(mazeList, start, end)
	//endpoint = BFS(mazeList,start,end)

	endpoint = algo[algoselect.value](mazeList,start,end)


	console.log("endpoint:", endpoint)
	//the maze is solved!
	searchAnimation = setInterval(fillSearch, 50, FRAMES)	
}

const algo = {
	"DFS": DFS,
	"BFS":BFS,
	"Dijkstras":shortestPath,
	"A-Star":aStar
}




//visited = { (0,0), (0,1), (1,1).. }
// cnt                 1   
var cnt = 0
var searchAnimation 
var pathAnimation
var endpoint = false // remember the last end point of taversal 
function fillSearch(frames){
	if (cnt < frames.length){
		var frameObj = frames[cnt] // {event:"", node:"0,0"}
		var event = frameObj.event
		var node = frameObj.node

		var row = node[0]
		var col = node[1]
		if (mazeArr[row][col] !=2 && mazeArr[row][col] !=3){
			if (event == "visited"){
				mazeArr[row][col] = 4
			}else if (event == "queue"){
				mazeArr[row][col] = 7
			} else if (event == "path"){
				mazeArr[row][col] = 8
			}
		}
		cnt ++
	}else{
		console.log("clearing search interval!")
		clearInterval(searchAnimation)
		ANIMATION = false
		reset.disabled = false 
		update.disabled = false
		FRAMES = []

		// do one final animation to display the final path from end to start
		if (endpoint != false){
			endpoint = TileObjs[endpoint] // look up the object for endpoint
			console.log("endpoint object:", endpoint)
			var finalpath = []
			while (endpoint.parent != null){
				finalpath.push({event:"path", node:endpoint.id }) // endpoint is a TileObj
				endpoint = endpoint.parent
			}

			ANIMATION = true
			reset.disabled = true
			update.disabled = true
			cnt = 0
			finalpath = finalpath.reverse()
			console.log("final path:",finalpath)
			pathAnimation = setInterval(fillPath, 50, finalpath)

		}


	}
}


function fillPath(frames){
	if (cnt < frames.length){
		var frameObj = frames[cnt] // {event:"", node:"0,0"}
		var event = frameObj.event
		var node = frameObj.node

		var row = node[0]
		var col = node[1]
		if (mazeArr[row][col] !=2 && mazeArr[row][col] !=3){
			if (event == "visited"){
				mazeArr[row][col] = 4
			}else if (event == "queue"){
				mazeArr[row][col] = 7
			} else if (event == "path"){
				mazeArr[row][col] = 8
			}
		}
		cnt ++
	}else{
		console.log("clearing path interval!")
		clearInterval(pathAnimation)
		ANIMATION = false
		reset.disabled = false 
		update.disabled = false
		path = []

	}
}



