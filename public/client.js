// client-side js
// run by the browser each time your view template is loaded

let numArray = [0,1,2,3,4,5,6,7,8,9,0];

// Table Elements
let tableCells = $('td'),
  topRow = $('#row-0').children(),
  sideColumn = $('td[id$="-0"]'),
  title = $('h1');

$(function() {
  title.on('click', () => {
    fillParticipants();
  }); // End title on click
});

// function to crawl through the the table that uses a callback function
let scanTable = (callback) => {
  for (let i = 0; i < tableCells.length; i++){
   callback(tableCells[i]); 
  }
}

// Fill the top and sides with random numbers
let fillNumCells = () => {
  
};

// Add participants to grid
let fillParticipants = () => {
  $.getJSON('https://spurious-relish.glitch.me/participants', function(data){
    // Each key, find cell in array and add name in that cell
    for (let keys in data){
      console.log(keys + ' ' + data[keys]);
      
    }
  });
};

// Just a simple log function
let log = (c) => console.log(c);

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
