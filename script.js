document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const cityInput = document.getElementById('city-input').value;
    if (cityInput.trim() !== '') {
        getWeather(cityInput);
    }
});

document.getElementById('search-history').addEventListener('click', function (e) {
    if (e.target.classList.contains('city-history')) {
        const cityName = e.target.innerText;
        getWeather(cityName);
    }
});

function getWeather(city) {
    const apiKey = '455c0b8c11656558b10503c51255d1ee';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => { 
            displayWeather(data);
            addToSearchHistory(city);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) { 
    const weatherInfo = document.getElementById('weather-info');
    const cityName = data.city.name;
    const forecast = data.list;
    weatherInfo.innerHTML = `<h2>${"This is how the " + data.city.name + " weather looks for the next 5 days!"}</h2>`;

    


function groupForecastByDay(forecast) {
    const groupedForecast = {};

    forecast.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString();

        if (!groupedForecast[day]) {
            groupedForecast[day] = [];
        }

        groupedForecast[day].push(item);
    });

    return groupedForecast;
}

    forecast.forEach(item=> {
        const date = new Date(item.dt * 1000);
        const temperature = item.main.temp;
        const humidity = item.main.humidity;
        const windSpeed = item.wind.speed;
        const icon = item.weather[0].icon;

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');

        forecastItem.innerHTML = `<p>Date: ${date.toLocaleDateString()}</p>
                                  <p>Time: ${date.toLocaleTimeString()}</p>
                                  <p>Temperature: ${temperature} °C</p>
                                  <p>Humidity: ${humidity}%</p>
                                  <p>Wind Speed: ${windSpeed} m/s</p>
                                  <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">`;

        weatherInfo.appendChild(forecastItem);
    }
        )
                            
}

function addToSearchHistory(city) {
    const searchHistory = document.getElementById('search-history');
    const cityHistory = document.createElement('div');
    cityHistory.classList.add('city-history');
    cityHistory.textContent = city;
    searchHistory.appendChild(cityHistory);
}
