// THEN I am presented with current and future conditions for that city and that city is added to the search history
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// THEN I am again presented with current and future conditions for that city

// apiKey = bb8cf7352a546a4f9b15fc1aa3026338

let citySearch = document.querySelector("#citySearch");
let currCity = document.querySelector("#currentCity");
let fiveday = document.querySelector("#fiveDay");
let inputEl = document.querySelector("#location");
let button = document.querySelector("#searchButton");
let fiveDiv = document.querySelector("#fiveDiv");
let dayOne = document.querySelector("#day1");
let dayTwo = document.querySelector("#day2");
let dayThree = document.querySelector("#day3");
let currentWeatherEl = document.querySelector("#c-weather");

function handleUserInput() {
  // get the user input
  let cityValue = inputEl.value;
  // once user clicks sumbit button
  currentWeather(cityValue);
  forecast(cityValue);

  saveSearch();
}

function currentWeather(city) {
  // fetch request to weather map
  const requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=bb8cf7352a546a4f9b15fc1aa3026338";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("CURRENT WEATHER ", data);
      currentWeatherEl.innerHTML = "";
      //city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed


      var icon = data.weather[0].icon;
      var iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
      var iconImage = `<img src='${iconUrl}' alt='${data.weather[0].description}'/>`;
      currentWeatherEl.innerHTML = iconImage;

      var now = dayjs().format("MMMM-DD-YYYY");
      var nowTime = document.createElement("p");
      nowTime.textContent = now;
      currentWeatherEl.append(nowTime);

      let cityEl = document.createElement("p");
      cityEl.textContent = data.name;
      currentWeatherEl.append(cityEl);

      let todayWeath = document.createElement("div");
      todayWeath.textContent = "Temperature: " + data.main.temp + "℉";
      currentWeatherEl.append(todayWeath);

      let humidEl = document.createElement("p");
      humidEl.textContent = "Humidity: " + data.main.humidity + "%";
      currentWeatherEl.append(humidEl);

      let windEl = document.createElement("p");
      windEl.textContent = "Windspeed: " + data.wind.speed + " MPH";
      currentWeatherEl.append(windEl);
    });
}

function forecast(city) {
  // fetch request to weather map
  const requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=bb8cf7352a546a4f9b15fc1aa3026338";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("FORECAST ", data);
      var fiveDayData = data.list.filter((day) =>
        day.dt_txt.includes("12:00:00")
      );
      console.log(fiveDayData);
      for (var i = 0; i < fiveDayData.length; i++) {
        var temp1 = document.querySelector("#temp1");
        temp1.innerHTML = fiveDayData[0].main.temp;

        var temp2 = document.querySelector("#temp2");
        temp2.innerHTML = fiveDayData[1].main.temp;

        var temp3 = document.querySelector("#temp3");
        temp3.innerHTML = fiveDayData[2].main.temp;
      }
    });
}

function saveSearch(cityName) {
  var storedCity = document.getElementById("location").value;
  localStorage.setItem(cityName, storedCity);
  var createLi = document.createElement("li");
  createLi.className += "history-btn";
  createLi.textContent = storedCity;
  document.getElementById("history").appendChild(createLi);
}

document.addEventListener("click", function (event) {
  if (event.target && event.target.matches("#history li")) {
    var listCity = event.target.textContent;
    currentWeather(listCity);
  }
});
//Local storage to store weather data

button.addEventListener("click", handleUserInput);
