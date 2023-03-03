const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {

    const query = req.body.city;
    const apiKey = "426d5010eb0a4931250d9a9135144597";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {

        console.log(response.statusCode);
        response.on("data", function (data) {
            const weather_data = JSON.parse(data);
            const temp = weather_data.main.temp;
            const description = weather_data.weather[0].description;
            const icon = weather_data.weather[0].icon;

            const icon_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>Weather details of " + query + "</h1>");
            res.write("<h3>It has " + description + "</h3>");
            res.write("<h3>The temps is " + temp + "</h3>");
            res.write("<img src=" + icon_url + ">");

            res.send()


        });

    });
})

app.listen(3000, function () {
    console.log("Server is running at port 3000");
});