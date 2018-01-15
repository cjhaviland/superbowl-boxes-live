// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/scoreboard", function (request, response) {
  var request = require('request'),
    username = process.env.USERNAME,
    password = process.env.USERNAME,
    url = `https://${username}:${password}api.mysportsfeeds.com/v1.1/pull/nfl/${season-name}/scoreboard.${format}?fordate=${for-date}`;

request(
    {
        url : url
    },
    function (error, response, body) {
        // Do more stuff with 'body' here
    }
);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
