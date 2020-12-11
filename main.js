// OpenWeather API key
const WEATHERKEY = '96bf8bc622edecbf9db6e995d585591d';
const GIPHYKEY = 'Tr3b0kFP73aJgMw5Jkxp45TO0JhVdJyN';

let units = 'imperial';

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

function renderGif(url) {
    // create img element for gif of weather
    const img = document.querySelector('#gif');
    img.src = url;
}

function renderData(data) {
  // create paragraph elements to display weather data
  const temp = document.querySelector('#temp');
  temp.innerText = 'Temperature: ' + data.temp;
  const description = document.querySelector('#weather');
  description.innerText = 'Weather: ' + data.weather;
}

// updates the value of units when the user clicks on the temp units
function selectUnits(event) {
  if (event.target.id === 'fahrenheit') {
    units = 'imperial';
    document.querySelector('#fahrenheit').classList.add('selected');
    document.querySelector('#celsius').classList.remove('selected');
  } else {
    units = 'metric';
    document.querySelector('#fahrenheit').classList.remove('selected');
    document.querySelector('#celsius').classList.add('selected');
  }
  // TODO: make call to weather API again
}

document.querySelector('#units').addEventListener('click', selectUnits);

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = getCity();
  const weatherData = getWeather(city, units);
  // get and render gif asynchronously
  weatherData.then((data) => getGif(data.weather))
    .then((url) => renderGif(url))
    .catch((error) => console.log(error));
  // render weather data in the DOM
  weatherData.then((data) => renderData(data))
    .catch((error) => console.log(error));    
});
