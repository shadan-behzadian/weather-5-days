// svg icons
let icons = {
  Clouds: "./allsvg/clouds.svg",
  Clear: "./allsvg/clear.svg",
  Tornado: "./allsvg/tornado.svg",
  Squall: "./allsvg/tornado.svg",
  Ash: "./allsvg/tornado.svg",
  Dust: "./allsvg/tornado.svg",
  Sand: "./allsvg/tornado.svg",
  Fog: "./allsvg/tornado.svg",
  Haze: "./allsvg/tornado.svg",
  Smoke: "./allsvg/tornado.svg",
  Mist: "./allsvg/tornado.svg",
  Snow: "./allsvg/snow.svg",
  Rain: "./allsvg/rain.svg",
  Drizzle: "./allsvg/drizzle.svg",
  Thunderstorm: "./allsvg/thunderstorm.svg",
};
//fetch weather data for Barcelona then calls currentWeather and forcast functions to show current weather and 5 upcoming days forcast
fetchWeatherData();
function fetchWeatherData() {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lon=2.159&lat=41.3888&uniots=metric&appid=ad86ce3ee764480409cf4761eedd5260",
    { method: "GET" }
  )
    .then(function (res) {
      if (res) {
        return res.json();
      }
    })
    .then(function (json) {
      let data = json;
      currentWeather(data);
      forcast(data.daily);
    })
    .catch(function (error) {
      console.log("Request failed: " + error.message);
    });
}
// current weather
function currentWeather(data) {
  document.querySelector(".current-icon").innerHTML = `<img  src=${
    icons[data.current.weather[0].main]
  }>`;
  document.querySelector(".currentInfo").innerHTML = `<h1>Barcelona, Spain</h1>
      <p class="current-temp">${convertToCelsius(data.current.temp)}&deg</p>
      <p class="current-humidity">Humidity: ${data.current.humidity}%</p>
      <p class="current-uvi">UVI: ${data.current.uvi}%</p>
      <p class="current-wind">Wind: ${windDirection(
        data.current.wind_deg
      )} ${convertWindSpeed(data.current.wind_speed)}Kmh</p>`;
}
// weather forcast of 5 upcoming days
function forcast(weekdays) {
  comingDays = [];
  for (i = 0; i < 5; i = i + 1) {
    comingDays.push(weekdays[i]);
  }
  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  let today = new Date().getDay();
  weekday[today] = "Today";
  let displayForcast = comingDays.map(function (day) {
    console.log(day);
    let dayNum = new Date(day.dt * 1000).getDay();
    return ` <div class="eachDay"> <p class="week-name">${weekday[dayNum]}</p>
    <img src=${
      icons[day.weather[0].main]
    } class="weather-icon" alt="weatherIcon"/>
    <p class="max-temp">${convertToCelsius(day.temp.max)}&degC</p>
    <p class="min-temp">${convertToCelsius(day.temp.min)}&degC</p>
    </div>`;
  });
  displayForcast = displayForcast.join("");
  document.querySelector(".forcast").innerHTML = displayForcast;
}
// convert temp Kelvin to celsius
function convertToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(0);
}
// convert wind speed m/s to km/h
function convertWindSpeed(meterSecond) {
  return (meterSecond * 3.6).toFixed(0);
}
//convert wind degree to letter (N , S , SE,...)
function windDirection(windDegree) {
  if (0 < windDegree && windDegree < 11.5) {
    return "N";
  } else if (11.5 < windDegree && windDegree <= 33.75) {
    return "N/NE";
  } else if (33.75 < windDegree && windDegree <= 56.25) {
    return "NE";
  } else if (56.25 < windDegree && windDegree <= 78.75) {
    return "E/NE";
  } else if (78.75 < windDegree && windDegree <= 101.25) {
    return "E";
  } else if (101.25 < windDegree && windDegree <= 123.75) {
    return "E/SE";
  } else if (123.75 < windDegree && windDegree <= 146.25) {
    return "SE";
  } else if (146.25 < windDegree && windDegree <= 168.75) {
    return "S/SE";
  } else if (168.75 < windDegree && windDegree <= 191.25) {
    return "S";
  } else if (191.25 < windDegree && windDegree <= 213.75) {
    return "S/SW";
  } else if (213.75 < windDegree && windDegree <= 236.25) {
    return "SW";
  } else if (236.25 < windDegree && windDegree <= 258.75) {
    return "W/SW";
  } else if (258.75 < windDegree && windDegree <= 281.25) {
    return "W";
  } else if (281.25 < windDegree && windDegree <= 303.75) {
    return "W/NW";
  } else if (303.75 < windDegree && windDegree <= 326.25) {
    return "NW";
  } else if (326.25 < windDegree && windDegree <= 348.75) {
    return "N/NW";
  } else if (348.75 < windDegree && windDegree <= 360) {
    return "N";
  }
}
