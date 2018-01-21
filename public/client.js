// client-side js
// run by the browser each time your view template is loaded

let numArray = [0,1,2,3,4,5,6,7,8,9];

let scoreObj = {};

// Table Elements
let tableCells = $('td'),
  topRow = document.querySelector('#row-0').querySelectorAll('td'),
  sideColumn = $('td[id$="-0"]'),
  title = $('h1');

// After DOM Load
$(function() {
  //init the table with participatnts object
  fillParticipants();
  
  title.on('click', () => {
    fillNumCells(topRow);
    fillNumCells(sideColumn);
  }); // End title on click
  
  // Run once on load
  scoreboardApi();
  
  // Every 10 mins refresh API data
  setInterval(() => {
    scoreboardApi();
  }, 600000);
}); // on ready function


// Add participants to grid
let fillParticipants = () => {
  $.getJSON('https://spurious-relish.glitch.me/participants', function(data){
    // Each key, find cell in array and add name in that cell
    for (let keys in data){
      for (let cell in data[keys]){
        document.querySelector(`#box-${data[keys][cell]}`).innerHTML = keys;
      }
    }
  });
};

// Updates the scorebox
let updateScores = () => {
  
}

// Scoreboard API
let scoreboardApi = () => {
  $.getJSON('https://spurious-relish.glitch.me/scoreboard', function(data){
    scoreObj = data;
  });
}

// Fill the top and sides with random numbers
let fillNumCells = (cells) => {
  // shuffle the array
  shuffle(numArray);
  
  // Slap into table
  for (let i = 1; i < cells.length; i++){
    cells[i].innerHTML = numArray[i - 1];
  }
};

// https://bost.ocks.org/mike/shuffle/
// Shuffle array O(n)
let shuffle = (array) => {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

// function to crawl through the the table that uses a callback function
let scanTable = (callback) => {
  for (let i = 0; i < tableCells.length; i++){
   callback(tableCells[i]); 
  }
}

// Just a simple log function
let log = (c) => console.log(c);
