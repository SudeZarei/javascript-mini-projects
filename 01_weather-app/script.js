const apiKey = "8b6ae34f3ca854bdb1389614306954f3";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

// Elements
const tempEl = document.querySelector(".temp");
const cityEl = document.querySelector(".city");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const searchInput = document.querySelector(".search input");
const btnSearch = document.querySelector(".search button");
const imgWeather = document.querySelector(".weather-icon");
const weatherEl = document.querySelector(".weather");
const errorEl = document.querySelector(".error");

// Start configuration
weatherEl.classList.add("hidden");
errorEl.classList.add("hidden");

// Functions
async function checkWeather(city) {
  const response = await fetch(apiURL + `&appid=${apiKey}` + `&q=${city}`);

  if (response.status == 404) {
    errorEl.classList.remove("hidden");
    weatherEl.classList.add("hidden");
    return;
  }

  const data = await response.json();

  cityEl.textContent = data.name;
  tempEl.textContent = `${Number(data.main.temp).toFixed(0)}°C`;
  humidityEl.textContent = `${data.main.humidity}%`;
  windEl.textContent = `${Number(data.wind.speed).toFixed(0)} km/h`;

  const weatherIcons = {
    Clouds: "images/clouds.png",
    Clear: "images/clear.png",
    Drizzle: "images/drizzle.png",
    Humidity: "images/humidity.png",
    Mist: "images/mist.png",
    Rain: "images/rain.png",
    Snow: "images/snow.png",
    Wind: "images/wind.png",
    Default: "images/clear.png",
  };

  imgWeather.src = weatherIcons[data.weather[0].main] || weatherIcons[Default];

  weatherEl.classList.remove("hidden");
  errorEl.classList.add("hidden");
}

btnSearch.addEventListener("click", () => {
  checkWeather(searchInput.value);
});
