// server.js
// where your node app starts

// init project
let express = require('express'),
    app = express(),
    request = require('request'),
    fs = require('fs'),
    mySportsFeed = require('mysportsfeeds-node');

let msf = new mySportsFeed('1.0', true);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('data'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// https://www.mysportsfeeds.com/data-feeds/api-docs#
// Grabbing live score updates from MySportsFeeds' scoreboard API
app.get('/scoreboard', function (req, res) {
  /*
  let username = process.env.USERNAME,
  password = process.env.PASSWORD,
  season_name = '2018-playoff',
  format = 'json',
  for_date = '20180113',
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
        res.json(JSON.parse(body));
      }
  );*/
  
  // Authenticate
  msf.authenticate(process.env.USERNAME, process.env.PASSWORD);
  
  // Get Data
  let data = msf.getData('nfl', '2018-playoff', 'scoreboard', 'json', '20180113');
  
  // Send data to page
  res.json(data);
});

app.get('/participants', function (req, res) {
  let contents = fs.readFileSync(__dirname + '/data/participants.json');
  res.json(JSON.parse(contents));
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
