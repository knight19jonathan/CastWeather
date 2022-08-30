console.log("linked");
var APIKey = "afe274eee2c9c2197ebc191f18f29248";
var APIKey2 = "09bba28188df0da3af4c8ff6fea079c1";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Seattle&units=imperial&appid=" + APIKey;
var APIKey3 = "16641d362119428a5b0643a28e7a4e02";


var city = "";
var searchClick = document.getElementById("search-form");
var searchCity = document.getElementById("city-searched");
var timeDisplayEl = document.getElementById("time");

// handle displaying the time
function displayTime() {
    var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a')
    $('#time').html(rightNow);
     setInterval(displayTime, 1000);
}


function displayWeather() {
    var weatherRequest = new XMLHttpRequest();
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    weatherRequest.open("GET", queryURL, true);
    weatherRequest.send();
    weatherRequest.onload = function () {
        var weatherData = JSON.parse(weatherRequest.responseText);
        console.log(weatherData);
        var temp = weatherData.main.temp;
        console.log("CURRENT TEMP:", temp)
        var city = document.getElementById("city-name");
        city.innerHTML = weatherData.name;
        var humidity = weatherData.main.humidity;
        var windSpeed = weatherData.wind.speed;
        console.log("CURRENT TEMP:", temp)
        var weatherDescription = weatherData.weather[0].description;
        var weatherIcon = weatherData.weather[0].icon;

        var weatherIconURL = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
        console.log(weatherIcon)
        var weatherIconEl = document.createElement("img");
        weatherIconEl.setAttribute("src", weatherIconURL);
        document.getElementById("city-name").appendChild(weatherIconEl);


        var tempEl = document.getElementById("temp");
        tempEl.textContent = ">Temp: " + temp + "°F";
        console.log("CURRENT TEMP:", temp)
        var humidityEl = document.getElementById("humidity");
        humidityEl.textContent = ">Humidity:" + humidity;
        var windSpeedEl = document.getElementById("wind-speed");
        windSpeedEl.textContent = ">Wind Speed: " + windSpeed + " mph, blowing on bearing " + weatherData.wind.deg + "°";
        var weatherDescriptionEl = document.getElementById("weather-description");
        weatherDescriptionEl.textContent = ">Weather Description: " + weatherDescription + ".";

        //getUVIndex();

    }
}


function getUVIndex() {
    var lat = "";
    var lon = "";
    localStorage.getItem("lat", lat);
    localStorage.getItem("lon", lon);
    console.log("2 lat: ", lat, "2 long:", lon);
    var uvIndexURL = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + APIKey3;
    fetch(uvIndexURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            var uvIndex = data.current.uvi;
            var uvIndexEl = document.getElementById("uv-index");
            uvIndexEl.textContent = ">UV Index: " + uvIndex;
        }).catch(function (error) {
            console.log(error);
        }
        );
}



function searchWeather() {
    city = searchCity.value;

    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    // var foreCastURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"
    localStorage.setItem("city", city);

    //displayWeather();

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            localStorage.setItem("lat", lat);
            localStorage.setItem("lon", lon);
            console.log("lat: ", lat, " long:", lon);
            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;

            fetch(forecastURL)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data);
                    var forecast = data.list;
                    for (var i = 0; i < forecast.length; i++) {
                        // dates forecasted
                        document.getElementById("date-one").textContent = moment(forecast[4].dt, "X").format("M/D/YY");
                        document.getElementById("date-two").textContent = moment(forecast[12].dt, "X").format("M/D/YY");
                        document.getElementById("date-three").textContent = moment(forecast[20].dt, "X").format("M/D/YY");
                        document.getElementById("date-four").textContent = moment(forecast[28].dt, "X").format("M/D/YY");
                        document.getElementById("date-five").textContent = moment(forecast[36].dt, "X").format("M/D/YY");

                        // day one data forecasted
                        var forecastTemp = forecast[4].main.temp;
                        var forecastHumidity = forecast[4].main.humidity;
                        var forecastWindSpeed = forecast[4].wind.speed;
                        var forecastWeatherDescription = forecast[4].weather[0].description;
                        var forecastWeatherIcon = forecast[4].weather[0].icon;

                        var forecastWeatherIconURL = "http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png";
                        var forecastWeatherIconEl = document.createElement("img");

                        forecastWeatherIconEl.setAttribute("src", forecastWeatherIconURL);
                        document.getElementById("date-one").appendChild(forecastWeatherIconEl);
                        var forecastTempEl = document.getElementById("temp-one");
                        forecastTempEl.textContent = ">Temp: " + forecastTemp + "°F";
                        var forecastHumidityEl = document.getElementById("humidity-one");
                        forecastHumidityEl.textContent = ">Humidity:" + forecastHumidity;
                        var forecastWindSpeedEl = document.getElementById("wind-one");
                        forecastWindSpeedEl.textContent = ">Wind Speed: " + forecastWindSpeed + " mph";

                        var foreDescOne = document.getElementById("desc-one")
                        foreDescOne.innerHTML = ">Weather Description: " + forecastWeatherDescription + ".";


                        // day two data forecasted
                        var forecastTemp2 = forecast[12].main.temp;
                        var forecastHumidity2 = forecast[12].main.humidity;
                        var forecastWindSpeed2 = forecast[12].wind.speed;
                        

                        var forecastWeatherDescription2 = forecast[12].weather[0].description;
                        var foreDescTwo = document.getElementById("desc-two")
                        foreDescTwo.innerHTML = ">Weather Description: " + forecastWeatherDescription2 + "."

                        var forecastWeatherIcon2 = forecast[12].weather[0].icon;
                        var forecastWeatherIconURL2 = "http://openweathermap.org/img/w/" + forecastWeatherIcon2 + ".png";
                        var forecastWeatherIconEl2 = document.createElement("img");

                        forecastWeatherIconEl2.setAttribute("src", forecastWeatherIconURL2);
                        document.getElementById("date-two").appendChild(forecastWeatherIconEl2);

                        var forecastTempEl2 = document.getElementById("temp-two");
                        forecastTempEl2.textContent = ">Temp: " + forecastTemp2 + "°F";

                        var forecastHumidityEl2 = document.getElementById("humidity-two");
                        forecastHumidityEl2.textContent = ">Humidity:" + forecastHumidity2;
                        var forecastWindSpeedEl2 = document.getElementById("wind-two");
                        forecastWindSpeedEl2.textContent = ">Wind Speed: " + forecastWindSpeed2 + " mph";


                        // day three data forecasted
                        var forecastTemp3 = forecast[20].main.temp;
                        var forecastHumidity3 = forecast[20].main.humidity;
                        var forecastWindSpeed3 = forecast[20].wind.speed;

                        var forecastWeatherDescription3 = forecast[20].weather[0].description;
                        var foreDescThree = document.getElementById("desc-three")
                        foreDescThree.innerHTML = ">Weather Description: " + forecastWeatherDescription3 + "."

                        var forecastWeatherIcon3 = forecast[20].weather[0].icon;
                        var forecastWeatherIconURL3 = "http://openweathermap.org/img/w/" + forecastWeatherIcon3 + ".png";
                        var forecastWeatherIconEl3 = document.createElement("img");

                        forecastWeatherIconEl3.setAttribute("src", forecastWeatherIconURL3);
                        document.getElementById("date-three").appendChild(forecastWeatherIconEl3);

                        var forecastTempEl3 = document.getElementById("temp-three");
                        forecastTempEl3.textContent = ">Temp: " + forecastTemp3 + "°F";

                        var forecastHumidityEl3 = document.getElementById("humidity-three");
                        forecastHumidityEl3.textContent = ">Humidity:" + forecastHumidity3;
                        var forecastWindSpeedEl3 = document.getElementById("wind-three");
                        forecastWindSpeedEl3.textContent = ">Wind Speed: " + forecastWindSpeed3 + " mph";
                        

                        // day four data forecasted
                        var forecastTemp4 = forecast[28].main.temp;
                        var forecastHumidity4 = forecast[28].main.humidity;
                        var forecastWindSpeed4 = forecast[28].wind.speed;

                        var forecastWeatherDescription4 = forecast[28].weather[0].description;
                        var foreDescfour = document.getElementById("desc-four")
                        foreDescfour.innerHTML = ">Weather Description: " + forecastWeatherDescription4 + "."

                        var forecastWeatherIcon4 = forecast[28].weather[0].icon;
                        var forecastWeatherIconURL4 = "http://openweathermap.org/img/w/" + forecastWeatherIcon4 + ".png";
                        var forecastWeatherIconEl4 = document.createElement("img");

                        forecastWeatherIconEl4.setAttribute("src", forecastWeatherIconURL4);
                        document.getElementById("date-four").appendChild(forecastWeatherIconEl4);

                        var forecastTempEl4 = document.getElementById("temp-four");
                        forecastTempEl4.textContent = ">Temp: " + forecastTemp4 + "°F";

                        var forecastHumidityEl4 = document.getElementById("humidity-four");
                        forecastHumidityEl4.textContent = ">Humidity:" + forecastHumidity4;
                        var forecastWindSpeedEl4 = document.getElementById("wind-four");
                        forecastWindSpeedEl4.textContent = ">Wind Speed: " + forecastWindSpeed4 + " mph";


                        // day five data forecasted
                        var forecastTemp5 = forecast[28].main.temp;
                        var forecastHumidity5 = forecast[28].main.humidity;
                        var forecastWindSpeed5 = forecast[28].wind.speed;

                        var forecastWeatherDescription5 = forecast[28].weather[0].description;
                        var foreDescfive = document.getElementById("desc-five")
                        foreDescfive.innerHTML = ">Weather Description: " + forecastWeatherDescription5 + "."

                        var forecastWeatherIcon5 = forecast[28].weather[0].icon;
                        var forecastWeatherIconURL5 = "http://openweathermap.org/img/w/" + forecastWeatherIcon5 + ".png";
                        var forecastWeatherIconEl5 = document.createElement("img");

                        forecastWeatherIconEl5.setAttribute("src", forecastWeatherIconURL5);
                        document.getElementById("date-five").appendChild(forecastWeatherIconEl5);

                        var forecastTempEl5 = document.getElementById("temp-five");
                        forecastTempEl5.textContent = ">Temp: " + forecastTemp5 + "°F";

                        var forecastHumidityEl5 = document.getElementById("humidity-five");
                        forecastHumidityEl5.textContent = ">Humidity:" + forecastHumidity5;
                        var forecastWindSpeedEl5 = document.getElementById("wind-five");
                        forecastWindSpeedEl5.textContent = ">Wind Speed: " + forecastWindSpeed5 + " mph";




                    }
                }).then(function () {
                    
                        let citydata = localStorage.getItem("city");
                        console.log("3rd", citydata);
                        let citybutton = document.createElement("button");
                        citybutton.type = 'button';
                        citybutton.textContent = citydata;
                        citybutton.className = 'btn btn-primary';
                        citybutton.id = 'city-button';
                        citybutton.style.width = '200px';
                        citybutton.style.height = '50px';
                        citybutton.style.margin = '10px';
                        citybutton.style.color = 'white';
                        citybutton.style.backgroundColor = '#00bcd4';
                        citybutton.style.borderRadius = '10px';
                        document.getElementById("city-button-container").appendChild(citybutton);
                        citybutton.addEventListener("click", function () {
                            event.preventDefault();
                            city = citybutton.textContent;
                            displayWeather();
                            searchWeather();
                        }
                        );
                }).catch(function (error) {
                    console.log(error);
                }).finally(function () {
                    console.log("finally");
                })
        })


}


function init() {
    displayTime();
    city = localStorage.getItem("city");
    console.log(city);
    displayWeather();
}





searchClick.addEventListener("submit", function (event) {
    event.preventDefault();
    city = searchCity.value;
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

    searchWeather();
});

init();