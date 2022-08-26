console.log("linked")

var keyAPI = "afe274eee2c9c2197ebc191f18f29248";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=" + APIKey;

var city = "";
var searchClick = document.getElementById("search-btn");
var searchCity = document.getElementById("city-searched");

searchClick.addEventListener("submit", function (event) {
    event.preventDefault();
    city = searchCity.value;
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    console.log(queryURL);
    getWeather();
});

// handle displaying the time
function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }
  