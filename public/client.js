// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html
let tableEl = document.querySelector('table');


$(function() {
  console.log(tableEl);
});

// function to crawl through the the table that uses a callback function

let scanTable = (callback) => {
  
}