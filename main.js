// OpenWeather API key
const WEATHERKEY = '96bf8bc622edecbf9db6e995d585591d';
const GIPHYKEY = 'Tr3b0kFP73aJgMw5Jkxp45TO0JhVdJyN';

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
    .then((data) => {
      const temp = document.createElement('p');
      temp.id = 'temp';
      temp.innerText = 'Temperature: ' + data.main.temp;
      const description = document.createElement('p');
      description.id = 'description';
      description.innerText = 'Weather: ' + data.weather[0].description;
      document.querySelector('#root').prepend(temp, description);
      return data.main.temp;
    })
    .catch((error) => console.log(error));
}

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = getCity();
  getWeather(city, units);
})
