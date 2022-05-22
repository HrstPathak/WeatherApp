window.addEventListener("load", () => {
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(long);
      console.log(lat);

      getCurWeatherReport(lat, long);
    });
  }
});

//WEATHER
var month = new Array();
{
  (month[0] = "January"),
    (month[1] = "Februrary"),
    (month[2] = "March"),
    (month[3] = "April"),
    (month[4] = "MAY"),
    (month[5] = "June"),
    (month[6] = "July"),
    (month[7] = "August"),
    (month[8] = "September"),
    (month[9] = "October"),
    (month[10] = "November"),
    (month[11] = "December");
}
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const temp = document.querySelector(".temp");
const description = document.querySelector(".description");
const minmax = document.querySelector(".min-max");
const icon = document.querySelector(".icon");

const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const pressure = document.querySelector(".pressure");

const d = new Date();
var mont = d.getMonth();
var dat = d.getDate();

var input = " ";
const inputValue = document.querySelector("#inputBox");
function getData() {
  input = inputValue.value;
  console.log(input);

  getWeatherReport(input);
}

const weatherAPI = {
  key: "f1dc56e4d3b6fcf093246c3ea9170392",
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
};

function getCurWeatherReport(lat, long) {
  fetch(
    `${weatherAPI.baseURL}?lat=${lat}&lon=${long}&appid=${weatherAPI.key}&units=metric`
  )
    .then((weather) => {
      return weather.json();
    })
    .then(showMeTheReport);
}

function getWeatherReport(city) {
  fetch(`${weatherAPI.baseURL}?q=${city}&appid=${weatherAPI.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showMeTheReport);
}
function showMeTheReport(weather) {
  console.log(weather);
  background(weather);
  document.getElementById("weatherBody").style.border = "2px solid grey";
  city.textContent = `${weather.name},${weather.sys.country}`.toUpperCase();
  date.textContent = dat + " " + month[mont];
  temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
  minmax.innerHTML = `${Math.floor(
    weather.main.temp_min - 1.75
  )}&deg;C(Min)/${Math.ceil(weather.main.temp_max + 1)}&deg;C(Max)`;
  description.textContent = `${weather.weather[0].main}(${weather.weather[0].description})`;
  icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  const w = weather.wind.speed;
  const value1 = w * 3.6;
  wind.innerHTML = `${value1.toFixed(1)}Kmph`;
  humidity.innerHTML = `${weather.main.humidity}%`;
  pressure.innerHTML = `${(weather.main.pressure / 100).toFixed(1)}Pa`;

  sunrise.innerHTML = `${window
    .moment(weather.sys.sunrise * 1000)
    .format("hh:mm a")}`;

  sunset.innerHTML = `${window
    .moment(weather.sys.sunset * 1000)
    .format("hh:mm a")}`;
}

function background(w) {
  let description = w.weather[0].main;
  // console.log(description);
  if (description === "Clear") {
    document.getElementById("body").style.backgroundImage =
      "url('https://ak.picdn.net/shutterstock/videos/1022659633/thumb/1.jpg')";
  } else if (description === "Haze") {
    document.getElementById("body").style.backgroundImage =
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXrQ30Et8INm11OwzYbVz4M3awKDmTUVEDkw&usqp=CAU')";
  } else if (description === "Clouds") {
    document.getElementById("body").style.backgroundImage =
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm1dbsWAFp1oi7C5zHBl860O7qBmkdYK0Zog&usqp=CAU')";
  } else if (description === "Rain") {
    document.getElementById("body").style.backgroundImage =
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0yD_3NmmpsXV2QjLETZh9lnABbf3BugEoGw&usqp=CAU')";
  } else if (description === "Snow") {
    document.getElementById("body").style.backgroundImage =
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LEBSXwYIIG2c1ccqGPCOaIy20SK8Wmkcxw&usqp=CAU')";
  } else if (description === "Thunderstorm") {
    document.getElementById("body").style.backgroundImage =
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpK4hvNmiQPkkCPlF6YRk0UCj03-fDKOBBwA&usqp=CAU')";
  }
}
