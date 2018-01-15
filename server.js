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
  var username = process.env.USERNAME,
  password = process.env.PASSWORD,
  season_name = '2018-playoff',
  format = 'json',
  for_date = '20180106',
  url = 'https://api.mysportsfeeds.com/v1.1/pull/nfl/' + season_name + '/scoreboard.' + format + '?fordate=' + for_date,
  auth = 'Basic ' + new Buffer(username+ ':' + password).toString('base64');
  

  request(
      {
        url : url,
        headers: {
          'Authorization' : auth
        }
      },
      function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body);
      }
  );
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
