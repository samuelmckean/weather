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
  return fetch
  (
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHERKEY}&units=${units}`, 
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((data) => {
      return {
        temp: data.main.temp,
        weather: data.weather[0].description,
      }
    })
    .catch((error) => console.log(error));
}

function getGif(searchTerm) {
  return fetch
  (
    `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHYKEY}&s=${searchTerm}`,
    { mode: 'cors' }
  )
  .then((response) => response.json())
  .then((gifData) => gifData.data.images.original.url)
  .catch((error) => console.log(error));
}

function updateDOM(data) {
  // start async process of getting gif
  getGif(data.weather)
    .then((url) => {
      // create img element for gif of weather
      const img = document.createElement('img');
      img.id = 'gif';
      img.src = url;
      document.querySelector('#root').prepend(img);
    })
    .catch((error) => console.log(error));
  // create paragraph elements to display weather data
  const temp = document.createElement('p');
  temp.id = 'temp';
  temp.innerText = 'Temperature: ' + data.temp;
  const description = document.createElement('p');
  description.id = 'description';
  description.innerText = 'Weather: ' + data.weather;
  document.querySelector('#root').prepend(temp, description);
}

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = getCity();
  getWeather(city, units)
    .then((weatherData) => updateDOM(weatherData))
    .catch((error) => console.log(error));    
})
