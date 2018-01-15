// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html
let hundredGrids = '';


$(function() {
  createGrids();

  $(hundredGrids).insertAfter(''
});

let createGrids = () => {
  for (var i = 0; i = 100; i++){
    hundredGrids += `<div id="box-${i}"></div>`;
  }
}

