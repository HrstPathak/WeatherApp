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
  document.querySelector("#inputBox").value = "";
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
// function conversion() {
//   const celTemp = document.querySelector(".temp").innerHTML;
//   const farenhite = (celTemp * (9 / 5) + 32).toFixed(1);
//   console.log(farenhite);
//   document.querySelector(".faren").innerHTML = farenhite;
// }
function showMeTheReport(weather) {
  console.log(weather);
  background(weather);
  document.getElementById("weatherBody").style.border = "2px solid grey";
  city.textContent = `${weather.name},${weather.sys.country}`.toUpperCase();
  date.textContent = dat + " " + month[mont];
  temp.innerHTML = `${Math.round(weather.main.temp)}`;
  document.querySelector(".degree").innerHTML = "&deg;C";
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
  // const curTime = `${window.moment(w.dt * 1000).format("hh:mm a")}`;
  // console.log(curTime);

  let main = w.weather[0].main;
  let description = w.weather[0].description;
  // console.log(main);
  if (main === "Clear") {
    document.getElementById("body").style.backgroundImage =
      "url('https://images.wallpaperscraft.com/image/single/blue_sky_sun_light_clouds_day_air_48047_1366x768.jpg')";
  } else if (main === "Haze") {
    document.getElementById("body").style.backgroundImage =
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXrQ30Et8INm11OwzYbVz4M3awKDmTUVEDkw&usqp=CAU')";
  }else if (main === "Clouds") {
    if (description === "overcast clouds") {
      document.getElementById("body").style.backgroundImage =
        "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm1dbsWAFp1oi7C5zHBl860O7qBmkdYK0Zog&usqp=CAU')";
    } else if (description === "broken clouds") {
      document.getElementById("body").style.backgroundImage =
        "url('https://thumbs.dreamstime.com/b/sun-hiding-behind-clouds-cloudy-autumn-day-sky-was-threatening-to-rain-couldn-t-seem-make-happen-165695273.jpg')";
    } else if (description === "few clouds") {
      document.getElementById("body").style.backgroundImage =
        "url('https://media.istockphoto.com/photos/the-sun-shining-through-low-cloud-picture-id94499094?b=1&k=20&m=94499094&s=170667a&w=0&h=5O76ulvOycsj_QHNKCZbKxzefIybaZfkrJe9DFKFMrk=')";
    } else {
      document.getElementById("body").style.backgroundImage =
        "url('https://thedestinyformula.com/wp-content/uploads/2018/08/Partly-sunny-weather.jpg')";
    }
  } else if (main === "Rain") {
    if (description == "shower rain") {
      document.getElementById("body").style.backgroundImage =
        "url('https://us.123rf.com/450wm/flynt/flynt1511/flynt151100011/48354992-rain-drops-falling-from-a-black-umbrella-concept-for-bad-weather-winter-or-protection.jpg?ver=6')";
    } else {
      document.getElementById("body").style.backgroundImage =
        "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0yD_3NmmpsXV2QjLETZh9lnABbf3BugEoGw&usqp=CAU')";
    }
  } else if (main === "Snow") {
    document.getElementById("body").style.backgroundImage =
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LEBSXwYIIG2c1ccqGPCOaIy20SK8Wmkcxw&usqp=CAU')";
  } else if (main === "Thunderstorm") {
    document.getElementById("body").style.backgroundImage =
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpK4hvNmiQPkkCPlF6YRk0UCj03-fDKOBBwA&usqp=CAU')";
  }
}
