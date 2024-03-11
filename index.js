const apikey = "12d6b365b439ac3cbee6721bbd4ba57d";
const weatherDataEl = document.querySelector('#weather-data');
const cityInputEl = document.getElementById('city-input');
const formEl = document.querySelector('form');
formEl.addEventListener('submit',(event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        if (!response.ok){
            throw new Error("Network response was not ok!");
        }
        const data = await response.json();
        const temprature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.feels_like} %`,
            `Wind Speed : ${data.wind.speed} m/s`,
    ]
        
    weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    weatherDataEl.querySelector(".temprature").textContent = temprature;
    weatherDataEl.querySelector(".description").textContent = description;
    weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=>`<div>${detail}</div>`).join(" ");
    } catch (error) {

            weatherDataEl.querySelector(".icon").innerHTML = "";
            weatherDataEl.querySelector(".temprature").textContent = "";
            weatherDataEl.querySelector(".description").textContent = "";
            weatherDataEl.querySelector(".details").innerHTML = "";
            weatherDataEl.querySelector(".icon").innerHTML = error;

    }
}