const apiKey = "01c5c0a68bb3f1c3e7ca20e5768640c7"; 

const locationInput = document.querySelector(".location-input");
const cityElement = document.querySelector(".city-name");
const conditionElement = document.querySelector(".condition");
const temperatureElement = document.querySelector(".temperature");
const windSpeedElement = document.querySelector(".wind-speed");
const locationButton = document.querySelector(".location-button");
const conditionImage = document.querySelector(".condition-image");

locationInput.addEventListener("keyup", e => {
    if(e.key == "Enter" && locationInput.value != ""){
        requestApi(locationInput.value);
    }
});

locationButton.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        console.log("Your browser does not support geolocation services.");
    }
});

function onSuccess(position){
    const { latitude, longitude } = position.coords;
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    
    fetch(api)
        .then(response => response.json())
        .then(result => weatherDetails(result))
        .catch(error => {
            console.error("An error occurred while fetching weather data.", error);
        });
}

function onError(error) {
    const errorMessage = "An error occurred: " + error.message;
    alert(errorMessage);
    console.log(error);
}

function requestApi(city){
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(api)
        .then(response => response.json())
        .then(result => weatherDetails(result))
        .catch(error => {
            console.error("An error occurred while fetching weather data.", error);
        });
}

function weatherDetails(info) {
    if (info.cod === 404) {
        alert("City not found");
    } else {
        const city = info.name;
        const condition = info.weather[0].description;
        const temperature = info.main.temp;
        const wind = info.wind.speed;
        
        cityElement.innerText = `Weather in ${city}`;
        conditionElement.innerText = `Sky Conditions: ${condition}`;
        temperatureElement.innerText = `Temperature: ${Math.round(temperature)}°C`;
        windSpeedElement.innerText = `Wind Speed: ${wind} km/h`;
    }
    
    const id = info.weather[0].id;
    if (id === 800) {
        conditionImage.src = "icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
        conditionImage.src = "icons/storm.svg";
    } else if (id >= 600 && id <= 622) {
        conditionImage.src = "icons/snow.svg";
    } else if (id >= 701 && id <= 781) {
        conditionImage.src = "icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
        conditionImage.src = "icons/cloud.svg";
    } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
        conditionImage.src = "icons/rain.svg";
    }
}
