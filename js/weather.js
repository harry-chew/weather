const loc = document.getElementById('location')
const temp = document.getElementById('temp');
const imgUrl = document.getElementById('imgUrl');
const windSpeed = document.getElementById('windSpeed');
const windDir = document.getElementById('windDir');
const body = document.getElementsByName('body');


const input = document.getElementById('location-search');
const search = document.getElementById('location-submit');
const details = document.getElementById('weather-details');



//let currentURL = 'https://api.weatherapi.com/v1/current.json?key=607673592df841cdb14133226221305&q=PE197BD&aqi=no'
//getCurrentWeather("PE196BD")
window.onload = onLoad();

function onLoad() {
  getIP();
  getCurrentWeather(input.value);
}

function getCurrentWeather(search) {

  const xhr = new XMLHttpRequest()
  let weatherURL

  weatherURL = "https://api.weatherapi.com/v1/current.json?key=607673592df841cdb14133226221305&q=" + search + "&aqi=no"
  xhr.open("GET", weatherURL)
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send()
  //triggered when the response is completed
  xhr.onload = function() {
    if (xhr.status === 200) {
      data = JSON.parse(xhr.responseText)
      console.log(data)
      setWeatherInfo(data.location.name,data.current.temp_c,data.current.condition.icon,data.current.wind_mph,data.current.wind_dir)
      details.classList.remove('hide');
    } else if (xhr.status === 404) {
      console.log("No records found")
    }
  }
}

function setWeatherInfo(l, t, i, ws, wd) {
  loc.innerHTML = l
  temp.innerHTML = 'Temperature: ' + t + '&#8451;'
  imgUrl.src = 'https:' + i
  windSpeed.innerHTML = 'Windspeed: ' + ws + ' mph'
  windDir.innerHTML = 'Wind Direction: ' + wd
}


function getIP() {
  const xhrIP = new XMLHttpRequest()
  xhrIP.open("GET", "https://api.ipify.org?format=json")
  xhrIP.setRequestHeader("Content-Type", "application/json")
  xhrIP.send()
  //triggered when the response is completed
  xhrIP.onload = function() {
    if (xhrIP.status === 200) {

      data = JSON.parse(xhrIP.responseText)
      //console.log(data.ip)
      input.value = data.ip;
      return data.ip
    } else if (xhrIP.status === 404) {
      console.log("No records found")
    }
  }
}



function searchButtonClicked() {
  getCurrentWeather(input.value);
}
