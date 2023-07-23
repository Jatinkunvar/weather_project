const express = require("express");
const https = require("https");
const bodyparser = require("body-parser")
const app = express();

app.use(bodyparser.urlencoded({extended: true }));


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req,res){

const query = req.body.cityName;
const APIkey = "781e1d539b83312fa9ef15f94d846ad5";
const units = "metric";

const url =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  query +
  "&appid=" +
  APIkey +
  "&units=" +
  units;

https.get(url, function (response) {
  console.log(response.statusCode);

  response.on("data", function (data) {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const ImageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    const weatherHTML =
      "<h1>The temperature in London is " + temp + " degrees Celsius.</h1>";
    const weatherText =
      "<p>The weather is currently " + weatherDescription + "<p>";

    res.write(weatherText); // Write the weather description to the response
    res.write(weatherHTML); // Write the temperature HTML to the response
    res.write("<img src=" + ImageURL + ">");
    res.send(); // Send the response to the client
  });
});
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
