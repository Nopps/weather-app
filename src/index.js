// Current date

let currentDateTime = new Date();

function formatDate(dateInput) {
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let date = dateInput.getDate();
  let weekDay = weekDays[dateInput.getDay()];
  let month = months[dateInput.getMonth()];
  let hrs = dateInput.getHours();
  if (hrs < 10) {
    hrs = `0${hrs}`;
  }
  let mins = dateInput.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }

  let formattedDate = `${weekDay}, ${date}. ${month}, ${hrs}:${mins}`;

  return formattedDate;
}

let elemementDateTime = document.querySelector("#current-time");
elemementDateTime.innerHTML = formatDate(currentDateTime);

// Show weather for searched city

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let elementTemp = document.querySelector("#temperature-value");
  elementTemp.innerHTML = temp;
  let description = response.data.weather[0].main;
  let elementDescription = document.querySelector("#weather-description");
  elementDescription.innerHTML = description;
  let city = response.data.name;
  let elementCity = document.querySelector("#element-city");
  elementCity.innerHTML = city;
  let searchCity = document.querySelector("#input-city");
  searchCity.value = city;
}

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  let apiKey = "c27d962bdd519287d55f21aff23bb4a0";
  let unit = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemp);
}

let searchCity = document.querySelector("#city-search-form");
searchCity.addEventListener("submit", getCity);

// Show weather for located city

function getLocationWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "c27d962bdd519287d55f21aff23bb4a0";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemp);
}

function locateCity(event) {
  navigator.geolocation.getCurrentPosition(getLocationWeather);
}

let cityLocation = document.querySelector("#button-locate");
cityLocation.addEventListener("click", locateCity);

// Convert temperature

/* function convertC2F() {
  let temperatureValue = document.querySelector("#temperature-value").innerText;
  let conversion = Math.round(temperatureValue * 1.8 + 32);
  let elementTemperature = document.querySelector("#temperature-value");
  elementTemperature.innerHTML = conversion;
  let buttonF = document.querySelector("#click-fahrenheit");
  let buttonC = document.querySelector("#click-celcius");
  buttonF.classList.add("unit--active");
  buttonC.classList.remove("unit--active");
}

let buttonF = document.querySelector("#click-fahrenheit");
buttonF.addEventListener("click", convertC2F);

function convertF2C() {
  let temperatureValue = document.querySelector("#temperature-value").innerText;
  let conversion = Math.round((temperatureValue - 32) * 0.5556);
  let elementTemperature = document.querySelector("#temperature-value");
  elementTemperature.innerHTML = conversion;
  let buttonF = document.querySelector("#click-fahrenheit");
  let buttonC = document.querySelector("#click-celcius");
  buttonF.classList.remove("unit--active");
  buttonC.classList.add("unit--active");
}

let buttonC = document.querySelector("#click-celcius");
buttonC.addEventListener("click", convertF2C); */
