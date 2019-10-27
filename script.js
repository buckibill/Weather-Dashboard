// This is my API key


function getWeatherData() {

    var searchValue = $("#searchValue").val();
    var APIKey = "1cc5557678da6e75998efa1634ff4271";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + APIKey;


    $.ajax({
        url: queryURL,
        type: "GET",
        dataType: "json"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Transfer content to HTML
            $(".city").text(response.name);
            $(".temp").text("Temperature (F) " + response.main.temp);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".wind").text("Wind Speed: " + response.wind.speed);

            // Converts the temp to Kelvin with the below formula
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $(".tempF").text("Temperature (Kelvin) " + tempF);


            getUVdata(response.coord.lat, response.coord.lon);
            getFiveDay(searchValue);
        });
}

function getUVdata(lat, lon) {

    var APIKey = "1cc5557678da6e75998efa1634ff4271";
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        type: "GET",
        dataType: "json"
    })
        .then(function (response) {
            $(".uvIndex").text("UV Index: " + response.value);
        });
}

function getFiveDay(city) {
    var APIKey = "1cc5557678da6e75998efa1634ff4271";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        type: "GET",
        dataType: "json"
    })

        .then(function (response) {
            let fiveDay = $(".fiveDay");
            for (var i = 0; i < 5; i++) {
                let pTag = $("<p></p>").text(response.list[i].main.temp);
                fiveDay.append(pTag);
            }
        });
}

$(".btn").on("click", function () {
    getWeatherData();
})
