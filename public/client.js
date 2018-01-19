// client-side js
// run by the browser each time your view template is loaded

let numArray = [0,1,2,3,4,5,6,7,8,9,0];

let tableEl = document.querySelector('table');


$(function() {
  console.log(tableEl);
});

// function to crawl through the the table that uses a callback function

let scanTable = (callback) => {
  
}

// https://bost.ocks.org/mike/shuffle/
// Shuffle array O(n)
function shuffle(array) {
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
