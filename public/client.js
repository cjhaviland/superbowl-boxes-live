// client-side js
// run by the browser each time your view template is loaded

let tableEl = document.querySelector('table');


$(function() {
  console.log(tableEl);
});

// function to crawl through the the table that uses a callback function

let scanTable = (callback) => {
  
}

let randomNumGen = () => {
  return Math.floor(Math.random());
}