// OpenWeather API key
const WEATHERKEY = '96bf8bc622edecbf9db6e995d585591d';

const units = 'imperial';

function getWeather(city) {
  fetch
  (
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHERKEY}&units=${units}`, 
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

getWeather('austin');