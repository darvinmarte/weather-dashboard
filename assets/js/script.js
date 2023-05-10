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

function handleUserInput() {
  // get the user input
  let cityValue = inputEl.value;
  // once user clicks sumbit button

  currentWeather(cityValue);
  forecast(cityValue);
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
      //city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
      
    function start() {
        setInterval(function () {
            let currentTime = document.createElement("p")
            currentTime.textcontent = (currentTime);
            current.append(currentTime)
        }, 1000);
    };
    start();

      let cityEl = document.createElement("p");
      cityEl.textContent = data.name;
      current.append(cityEl);
      
      let todayWeath = document.createElement("div");
      todayWeath.textContent = 'Temperature: ' + data.main.temp + "℉";
      current.append(todayWeath);


      let humidEl = document.createElement("p");
      humidEl.textContent = 'Humidity: ' + data.main.humidity + '%';
      current.append(humidEl);


      let windEl = document.createElement('p');
      windEl.textContent = 'Windspeed: ' + data.wind.speed + " MPH";
      current.append(windEl);
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
      //create cards to display 5 day
    });
}

//Local storage to store weather data

button.addEventListener("click", handleUserInput);
