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
let fivDayDay = document.querySelector('fivDayTime')

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

      let cityEl = document.createElement('p');
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
      // displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
      console.log(fiveDayData);
      for (var i = 0; i < fiveDayData.length; i++) {
        
        // var icon1 = data.weather[0].icon;
        // var iconUrl1 = `https://openweathermap.org/img/w/${icon1}.png`;
        // var iconImage1 = `<img src='${iconUrl}' alt='${data.weather[0].description}'/>`;
        // currentWeatherEl.innerHTML = iconImage;

        var fivDay = dayjs().format("MMMM-DD-YYYY");
        var fivDayTime = document.getElementById(fivDayDay)
        // DAY 1
        var temp1 = document.querySelector("#temp1");
        temp1.innerHTML = 'Temp: ' + fiveDayData[0].main.temp; + " ℉";

        var hum1 = document.querySelector("#hum1");
        hum1.innerHTML = 'Humidity: ' + fiveDayData[0].main.humidity; + ' %';

        var wind1 = document.querySelector('#wind1');
        wind1.innerHTML = "Windspeed: " + fiveDayData[0].wind.speed + " MPH";
        
        //DAY 2
        var temp2 = document.querySelector("#temp2");
        temp2.innerHTML = 'Temp: ' + fiveDayData[1].main.temp;

        var hum2 = document.querySelector("#hum2");
        hum2.innerHTML = 'Humidity: ' + fiveDayData[1].main.humidity; + ' %';

        var wind2 = document.querySelector('#wind2');
        wind2.innerHTML = "Windspeed: " + fiveDayData[1].wind.speed + " MPH";

        //DAY 3

        var temp3 = document.querySelector("#temp3");
        temp3.innerHTML = 'Temp: ' + fiveDayData[2].main.temp;

        var hum3 = document.querySelector("#hum3");
        hum3.innerHTML = 'Humidity: ' + fiveDayData[2].main.humidity; + ' %';

        var wind3 = document.querySelector('#wind3');
        wind3.innerHTML = "Windspeed: " + fiveDayData[2].wind.speed + " MPH";
        
        //DAY 4
        var temp4 = document.querySelector("#temp4");
        temp4.innerHTML = 'Temp: ' + fiveDayData[3].main.temp;

        var hum4 = document.querySelector("#hum4");
        hum4.innerHTML = 'Humidity: ' + fiveDayData[3].main.humidity; + ' %';

        var wind4 = document.querySelector('#wind4');
        wind4.innerHTML = "Windspeed: " + fiveDayData[3].wind.speed + " MPH";

        //DAY 5
        var temp5 = document.querySelector("#temp5");
        temp5.innerHTML = 'Temp: ' + fiveDayData[4].main.temp; + "℉";

        var hum5 = document.querySelector("#hum5");
        hum5.innerHTML = 'Humidity: ' + fiveDayData[4].main.humidity; + ' %';

        var wind5 = document.querySelector('#wind5');
        wind5.innerHTML = "Windspeed: " + fiveDayData[4].wind.speed + " MPH";
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
