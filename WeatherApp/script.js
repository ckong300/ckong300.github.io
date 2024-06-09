var app = document.getElementById("app")
var city = document.getElementById("cityname")
var img = document.getElementById("img")
var temp = document.getElementById("temp")
var description = document.getElementById("description")
var date = document.getElementById("date")
var humidity = document.getElementById("humidity")
var wind = document.getElementById("wind")

var searchBar = document.getElementById("input")

var skeleton = document.getElementById("skeleton")

searchBar.addEventListener("keypress", getData)

async function getData(event) {

	if ( event.key == "Enter"){
		app.style.display = "None"
		skeleton.style.display = "Block"

		//how extract icon info https://openweathermap.org/weather-conditions
		// set the source of the image to link of the icon image

		var url = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&appid=a637896d7f11837dddb79e4e9be5aafd`

		var response = await fetch(url) // Wait for server to respond.
		var data = await response.json() // wait for readableStream.

		if (data.message){
			alert("wrong city name")
			return
		}


		console.log(data) // data is dictionary filled with data 
		// api response formatting : https://openweathermap.org/current#fields_json
		city.innerHTML = data.name
		var weather_condition = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
		img.src = weather_condition
		temp.innerHTML = Math.round(((data.main.temp-273.15)*9/5)+32) + " F"
		description.innerHTML = data.weather[0].description
		date.innerHTML = new Date().toDateString().slice(0,10)
		humidity.innerHTML = data.main.humidity
		wind.innerHTML = data.wind.speed + " mph"


		app.style.display = "Block"
		skeleton.style.display = "None"
	}

}

