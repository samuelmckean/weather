// OpenWeather API key
const WEATHERKEY = '96bf8bc622edecbf9db6e995d585591d';

const units = 'imperial';

// gets the user input for the city to search
function getCity() {
  return document.querySelector('form').location.value;
}

// makes the API request to get the weather data
function getWeather(city, units) {
  fetch
  (
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHERKEY}&units=${units}`, 
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = getCity();
  getWeather(city, units);
})
