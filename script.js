async function getWeather(){

let city = document.getElementById("city").value;

let apiKey = "52fc4d47672ff4e04171827ccfbc97e6";

let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

try{

let response = await fetch(url);
let data = await response.json();

if(data.cod == 200){

showWeather(data);
getForecast(city);

}else{

document.getElementById("weather").innerHTML =
"<p>City not found</p>";

}

}catch(error){

document.getElementById("weather").innerHTML =
"<p>Error fetching weather data</p>";

}

}



function showWeather(data){

let cityName = data.name;
let temp = data.main.temp;
let weather = data.weather[0].main;
let humidity = data.main.humidity;
let wind = data.wind.speed;
let icon = data.weather[0].icon;

let iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

document.getElementById("weather").innerHTML = `
<h2>${cityName}</h2>
<img src="${iconURL}">
<p><b>Temperature:</b> ${temp}°C</p>
<p><b>Weather:</b> ${weather}</p>
<p><b>Humidity:</b> ${humidity}%</p>
<p><b>Wind Speed:</b> ${wind} m/s</p>
`;



/* Dynamic Background */

if(weather=="Clear"){
document.body.style.background="orange";
}

else if(weather=="Clouds"){
document.body.style.background="lightgray";
}

else if(weather=="Rain"){
document.body.style.background="darkblue";
}

}



/* ENTER KEY SEARCH */

document.getElementById("city").addEventListener("keypress", function(e){

if(e.key === "Enter"){
getWeather();
}

});



/* LOCATION WEATHER */

function getLocationWeather(){

navigator.geolocation.getCurrentPosition(async function(position){

let lat = position.coords.latitude;
let lon = position.coords.longitude;

let apiKey = "52fc4d47672ff4e04171827ccfbc97e6";

let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

let response = await fetch(url);
let data = await response.json();

showWeather(data);

getForecast(data.name);

});

}



/* DARK MODE */

function toggleMode(){
document.body.classList.toggle("dark");
}



/* 5 DAY FORECAST */

async function getForecast(city){

let apiKey = "52fc4d47672ff4e04171827ccfbc97e6";

let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

let response = await fetch(url);
let data = await response.json();

let forecastHTML = "";

for(let i=0;i<data.list.length;i+=8){

let day = new Date(data.list[i].dt_txt).toDateString();
let temp = data.list[i].main.temp;
let icon = data.list[i].weather[0].icon;

forecastHTML += `
<div class="forecast-card">
<p>${day}</p>
<img src="https://openweathermap.org/img/wn/${icon}.png">
<p>${temp}°C</p>
</div>
`;

}

document.getElementById("forecast-container").innerHTML = forecastHTML;

}