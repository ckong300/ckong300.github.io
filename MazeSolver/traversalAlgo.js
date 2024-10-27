function DFS(mazeList,start,end){
	console.log("start:",start,"end:",end)
	var visited = {}
	var mazeStack = [start]// start [0,0]


	while (mazeStack.length > 0) {
			//visit current node
			var current = mazeStack.pop() 
			visited[current] = 0 //mark current as visited
			FRAMES.push({event:"visited",node:current}) 

			if (sameTile(current,end) ){
				console.log("Found exit!")
				return end
			}

			//find all neighbors and add them into stack 
			for ( let t = 0; t < mazeList[current].length; t++ ) {
				let neighbor = mazeList[current][t]
				if ( !(neighbor in visited) && inQueue(neighbor, mazeStack) == false ){//check if neighbot not in dictionary
					mazeStack.push(neighbor)
					TileObjs[neighbor].parent = TileObjs[current]
					FRAMES.push({event:"queue", node:neighbor})
				}
			}
	}
	return false // indicate no exit
}

/*
mazeList = {

	[0,0] : [ [0,1], [1,0] ]
}

TileObj ={
	[0,0] : <TileObj>
}
*/
function BFS(mazeList,start,end){
	var visited  = {}
	var mazeStack = [start]

	while (mazeStack.length > 0) {

		//current = [1,1]
		var current = mazeStack.shift()
		visited[current] = 0
		FRAMES.push({event:"visited",node:current})

		if (sameTile(current, end)) {
			return end
		}

		//find all neighbors we haven't visited and add them to queue using .push()
		for ( let i = 0; i < mazeList[current].length; i++) {

			if ( !( inQueue(mazeList[current][i], mazeStack) ) && !(mazeList[current][i] in visited) ) {
				mazeStack.push( mazeList[current][i] )
				FRAMES.push({event:"queue", node:mazeList[current][i]})
				TileObjs[mazeList[current][i]].parent = TileObjs[current]
			}
		}
	}
	return false
}

function sameTile(tile1,tile2){
	return tile1[0] === tile2[0] && tile1[1] === tile2[1]
}


// function getPriority(list) {
// 	let shortest = 999999999999999
// 	let shortestRoute 
// 	let index = null
// 	for ( let i = 0; i < list.length; i++ ) {
// 		if ( list[i][0] < shortest ) {
// 			shortest = list[i][0]
// 			shortestRoute = list[i]
// 			index = i
// 		}
// 	}
// 	if (index != null){
// 		list.splice( index ,  1)
// 		// console.log("returning:", shortestRoute)
// 		return shortestRoute
// 	}
// }

// Dikstras' Algo
function shortestPath(graph, beginning, end) {
	var shortest = {}
	
	var minheap = new Heap() 
	minheap.push([0, beginning])
	
	
	var cur_cost 
	var cur_ID 


	while (minheap.length != 0) {

		// let cur_node = getPriority(minheap)
		[cur_cost,  cur_ID] = minheap.pop()

		FRAMES.push( { event:"visited", node: cur_ID} )

		if (sameTile( cur_ID, end )) {
			return end
		}

		if (cur_ID in shortest ) {
			continue
		}
		shortest[cur_ID] = cur_cost

		for ( let i = 0; i < graph[cur_ID].length; i++ ) {
			if ( !( graph[cur_ID][i] in shortest ) ) {
				minheap.push( [ cur_cost + TileObjs[graph[cur_ID][i]].cost, graph[cur_ID][i] ] )
				FRAMES.push( {event:"queue", node:graph[cur_ID][i]} )
				TileObjs[ graph[cur_ID][i] ].parent = TileObjs[cur_ID]
			}
		}
	}
	return false
}




function inQueue( tile, mazeStack ){
	for ( let i = 0; i < mazeStack.length; i ++ ){
		if ( sameTile( tile, mazeStack[i] ) ){
			return true
		}
	}
	return false
}


function aStar( graph, start ,end) {
	//var queue = []
	var queue = new Heap()
	
	TileObjs[start].stepsFromStart =  0
	TileObjs[start].dist2Goal =  Math.abs(start[0] - end[0]) + Math.abs( start[1] - end[1] )
	var shortest = {} // tracks visited nodes
	var cur_cost 
	var cur_ID
	queue.push([ 0, start ])
	while (queue.length != 0) {
		[cur_cost, cur_ID] = queue.pop()
		//let cur_node = getPriority(queue)
		//var cur_cost = cur_node[0]
		//var cur_ID = cur_node[1]
		FRAMES.push( { event:"visited", node: cur_ID} )

		if (sameTile( cur_ID, end )) {
			return end
		}

		if (cur_ID in shortest ) {
			continue
		}

		shortest[cur_ID] = cur_cost

		for ( let i = 0; i < graph[cur_ID].length; i++ ) {
			if ( !( graph[cur_ID][i] in shortest ) ) {
				//cur_cost + TileObjs[graph[cur_ID][i]].cost
				let neighborID = graph[cur_ID][i]  // [ 1, 1]

				let tilecost = TileObjs[graph[cur_ID][i]].cost
				TileObjs[neighborID].stepsFromStart = TileObjs[cur_ID].stepsFromStart + 1

				let distFromGoal = Math.abs( neighborID[0] - end[0] ) + Math.abs( neighborID[1] - end[1] )
				TileObjs[neighborID].dist2Goal = distFromGoal



				queue.push( [ (tilecost + distFromGoal + TileObjs[neighborID].stepsFromStart), neighborID  ] )
				FRAMES.push( {event:"queue", node:graph[cur_ID][i]} )
				TileObjs[ graph[cur_ID][i] ].parent = TileObjs[cur_ID]
			}
		}
	}
}
