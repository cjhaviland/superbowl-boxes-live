// client-side js
// run by the browser each time your view template is loaded

let numArray = [0,1,2,3,4,5,6,7,8,9,0];

// Table Elements
let tableCells = $('td'),
topRow = $('#row-0').children(),
sideColumn = $('td[id$="-0"]');

$(function() {
  scanTable(log);
});

// function to crawl through the the table that uses a callback function
let scanTable = (callback) => {
  for (let cell in tableCells){
   callback(tableCells[cell]); 
  }
}

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

let log = (c) => console.log(c);