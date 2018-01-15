// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var request = require('request');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/scoreboard", function (req, res) {
  var username = process.env.USERNAME;
  var password = process.env.PASSWORD;
  var season_name = '2018-playoff';
  var format = 'json';
  var for_date = '20180106';
  var url = 'https://' + username+ ':' + password + 'api.mysportsfeeds.com/v1.1/pull/nfl/' + season_name + '/scoreboard.' + format + '?fordate=' + for_date;

  request(
      {
          url : url
      },
      function (error, response, body) {
          console.log(body);
      }
  );
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
