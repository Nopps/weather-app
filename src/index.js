// Current date

let currentDateTime = new Date();

function formatDate(dateInput) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Fridat",
    "Saturday",
  ];
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

// Forecast 5 days

function formatWeekDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function formatDdMm(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }

  let DdMm = `${day}.${month}.`;

  return DdMm;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let elementForecast = document.querySelector("#forecast");
  let forecastHTML = "";
  let elementForecastFirst = document.querySelector("#forecast-first");
  let forecastHTMLFirst = "";

  forecast.slice(2).forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML += ` 
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-6">
          <div class="card-body">
            <h3 class="card-title">${formatWeekDay(forecastDay.dt)}</h3>
            <p class="card-text">${formatDdMm(forecastDay.dt)}</p>
          </div>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-end forecast-item">
              <span class="temperature--min">${Math.round(
                forecastDay.temp.min
              )}</span>
              <span class="temperature--max">${Math.round(
                forecastDay.temp.max
              )}</span>
              <span class="temperature--icon"><img src="src/${
                forecastDay.weather[0].icon
              }.svg" class="icon--next" /></span>
            </div>
      </div>
    </div>
  `;
    }
  });

  forecast.slice(1).forEach(function (forecastDay, index) {
    if (index < 1) {
      forecastHTMLFirst += ` 
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-6">
          <div class="card-body">
            <h3 class="card-title">Tomorrow</h3>
            <p class="card-text">${formatWeekDay(forecastDay.dt)}, ${formatDdMm(
        forecastDay.dt
      )}</p>
          </div>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-end forecast-item">
              <span class="temperature--min">${Math.round(
                forecastDay.temp.min
              )}</span>
              <span class="temperature--max">${Math.round(
                forecastDay.temp.max
              )}</span>
              <span class="temperature--icon"><img src="src/${
                forecastDay.weather[0].icon
              }.svg" class="icon--next" /></span>
            </div>
      </div>
    </div>
  `;
    }
  });

  elementForecast.innerHTML = forecastHTML;
  elementForecastFirst.innerHTML = forecastHTMLFirst;
}

// Show weather for searched city

let city = "";
let temp = "";

function getForecastCoord(coordinates) {
  let apiKey = "c27d962bdd519287d55f21aff23bb4a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleResultsForCity(response) {
  city = response.data.name;
  temp = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let windspeed = Math.round(response.data.wind.speed) / 10;
  let icon = response.data.weather[0].icon;

  let elementCity = document.querySelector("#element-city");
  let elementDescription = document.querySelector("#weather-description");
  let elementTemp = document.querySelector("#temperature-value");
  let elementHumidity = document.querySelector("#humidity-value");
  let elementWindspeed = document.querySelector("#windspeed-value");
  let elementIcon = document.querySelector("#icon-current");

  let searchCity = document.querySelector("#input-city");

  elementCity.innerHTML = city;
  elementDescription.innerHTML = description;
  elementTemp.innerHTML = temp;
  elementHumidity.innerHTML = `${humidity} %`;
  elementWindspeed.innerHTML = `${windspeed} m/s`;
  elementIcon.setAttribute("src", `src/${icon}.svg`);

  searchCity.value = city;
  imgQuery();

  getForecastCoord(response.data.coord);
}

// Get city photo

function getImgData(response) {
  let imgUrl = response.data.results[0].urls.regular;
  let photographer = response.data.results[0].user.name;
  let profileUrl = response.data.results[0].user.links.html;

  let elementBgImg = document.querySelector("#bg-img");
  let elementPhotographer = document.querySelector("#photographer");
  let elementProfileUrl = document.querySelector("#profile-url");
  let elementCityImg = document.querySelector("#city-photo");

  elementBgImg.setAttribute("style", `background-image: url(${imgUrl});`);
  elementCityImg.innerHTML = city;
  elementPhotographer.innerHTML = photographer;
  elementProfileUrl.setAttribute("href", profileUrl);
}

function imgQuery() {
  let query = city.toLowerCase();
  let apiUrl = `https://unsplash.farnsworth.ch/api/f149a8/?query=${query}`;
  axios.get(apiUrl).then(getImgData);
}

function getCity(event) {
  event.preventDefault();
  //let city = document.querySelector("#input-city").value;
  let city = "helsinki"; //for testing
  let apiKey = "c27d962bdd519287d55f21aff23bb4a0";
  let unit = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(handleResultsForCity);
}

let searchCity = document.querySelector("#city-search-form");
searchCity.addEventListener("submit", getCity);

// Show weather for located city

function getLocationWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c27d962bdd519287d55f21aff23bb4a0";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(handleResultsForCity);
}

function getLocation(event) {
  navigator.geolocation.getCurrentPosition(getLocationWeather);
}

//window.addEventListener("load", getLocation);
window.addEventListener("load", getCity); // for testing
let locate = document.querySelector("#button-locate");
locate.addEventListener("click", getLocation);
