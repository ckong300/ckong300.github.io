class Heap{

	constructor(){
		this.data = [null]
		// [ [cost, id], [cost2, id2 ], [cost3,id3] ...]
	}


	push(datapoint){
		// datapoint = [cost , id ]
		this.data.push(datapoint)
		var i = this.data.length - 1
		
		while ( i > 1 && this.data[i][0] < this.data[Math.floor(i/2)][0] ){
			var tmp = this.data[i]
			this.data[i] = this.data[Math.floor(i/2)]
			this.data[Math.floor(i/2)] = tmp
			i = Math.floor(i/2)
		}
	}

	pop(){
		if (this.data.length == 1) {
			return null
		}else if (this.data.length == 2) {
			return this.data.pop()
		}else {
			var root = this.data[1]
			this.data[1] = this.data.pop()
			var i = 1
			while (i*2 < this.data.length) {
				if ((i*2+1 < this.data.length) && (this.data[i*2][0] <= this.data[i*2+1][0]) && (this.data[i*2][0] < this.data[i][0])){ //swap left
						let num = this.data[i*2]
						console.log("swap left",num)

						this.data[i*2] = this.data[i]
						this.data[i] = num
						i = i*2
					//swap right
				}else if ( (i*2+1 < this.data.length)  && (this.data[i*2][0] > this.data[i*2+1][0]) && (this.data[i*2+1][0] < this.data[i][0])){ // swap right
						let num = this.data[i*2+1]
						console.log("swap right",num)

						this.data[i*2+1] = this.data[i]
						this.data[i] = num
						i = i*2+1
				}else {
						break
				}		
			}
			return root
		}
	}
}

	



// var heap = new Heap()


// var L = [[10,"a"], [14,"b"] , [14, "c"], [21,"d"] ,[26,"e"] ,[19,"f"],[99,"g"],[65,"h"],[30,"i"]]

// for (let i of L){
// 	heap.push(i)
// }
// heap.push([1,"z"])

// console.log(JSON.stringify( heap.data ) )
// heap.pop()
// console.log(JSON.stringify( heap.data ) )
// heap.pop()
// console.log(JSON.stringify( heap.data ) )
// heap.pop()
// console.log(JSON.stringify( heap.data ) )