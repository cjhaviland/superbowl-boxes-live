// client-side js
// run by the browser each time your view template is loaded

//let numArray = [0,1,2,3,4,5,6,7,8,9];
let scoreObj = {};
//let awayArray = [9,8,7,4,3,2,1,0,5,6]
//let homeArray = [3,0,2,5,6,4,8,7,1,9]
let timeout;
let lastUpdated;

let awayArray = [1,2,3,4,5,6,7,8,9,10];
let homeArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

// Table Elements
let tableCells = $('td'),
  topRow = document.querySelector('#row-0').querySelectorAll('td'), //away
  sideColumn = $('td[id$="-0"]'), //home
  title = $('h1');

// scoreboard elements
let awayScoreboard = document.querySelector('#away-team').getElementsByTagName('td'),
  homeScoreboard = document.querySelector('#home-team').getElementsByTagName('td');

// After DOM Load
$(function() {
  //init the table with participatnts object
  fillParticipants();
  fillNumCells(topRow, awayArray);
  fillNumCells(sideColumn, homeArray);
  
  // For testing
  //title.on('click', () => {
     
  //}); // End title on click
  
  // Start API refresh
  scoreboardApi();   
  
  // On Hoverfor highlighting
 $('.superbowl-pool-grid td:not(td[id$="-0"]):gt(9)').hover(function(){
   $(`td:contains(${ $(this).html() })`).toggleClass('winner');
 });
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
}; // end fillParticipants

// Scoreboard API
let scoreboardApi = () => {
  $.getJSON('https://spurious-relish.glitch.me/scoreboard', function(data){
    lastUpdated = data.scoreboard.lastUpdatedOn;
    scoreObj = data.scoreboard.gameScore[0];
  })
  .done(() => {
    updateScores();
    updateWinners();
  });
  
  console.log('Refreshed');
  
  // Every 10 mins refresh API data
  timeout = setTimeout(function(){
    scoreboardApi();
  }, 600000);
  
  // If the game is over kill the refresh
  if (scoreObj.isCompleted == 'true'){
    clearTimeout(timeout);
  }
} // end scoreboardApi

// Updates the scorebox
let updateScores = () => {
  let awayScore = 0;
  let homeScore = 0;
  
  awayScoreboard[0].innerHTML = scoreObj.game.awayTeam.Abbreviation;
  homeScoreboard[0].innerHTML = scoreObj.game.homeTeam.Abbreviation;
  document.querySelector('.away-team-logo').innerHTML = scoreObj.game.awayTeam.Name;
  document.querySelector('.home-team-logo').innerHTML = scoreObj.game.homeTeam.Name;
  document.querySelector('#lastUpdated').innerHTML = `Last Updated: ${lastUpdated}`;
  
  if (scoreObj.isInProgress != 'false' || scoreObj.isCompleted == 'true') {
    let quarters = scoreObj.quarterSummary.quarter;
    
    for (let i = 0; i < quarters.length; i++){
      // @number, awayScore, homeScore
      awayScore +=  parseInt(quarters[i].awayScore);
      homeScore +=  parseInt(quarters[i].homeScore);
      
      // Quarter Scores
      awayScoreboard[`${quarters[i]["@number"]}`].innerHTML = quarters[i].awayScore;
      homeScoreboard[`${quarters[i]["@number"]}`].innerHTML = quarters[i].homeScore;
      
      // Update Total Score
      awayScoreboard[6].innerHTML = awayScore;
      homeScoreboard[6].innerHTML = homeScore;
    }
  }
  
  if (awayScoreboard[5].innerHTML == '' && homeScoreboard[5].innerHTML == ''){
    $('#scoreboard-grid td:nth-child(6), th:nth-child(6)').hide();
  }
  
}// end updateScores

// Update Grid with Winners
let updateWinners = () => {
  let away = 0;
  let home = 0;
  
  for (let i = 1; i < 5; i++){
    away += parseInt(awayScoreboard[i].innerHTML);
    home += parseInt(homeScoreboard[i].innerHTML);
    
    let awayRow = document.querySelector(`#row-0 [data-scorenum='${parseInt(away) % 10}']`).dataset.num;
    let homeCol = document.querySelector(`td[id$='-0'][data-scorenum='${parseInt(home) % 10}']`).dataset.num;
    
    if (away != '' && home != ''){
      $(`#box-${homeCol}-${awayRow}`).addClass('winner');
      console.log(`#box-${homeCol}-${awayRow} ${parseInt(away) % 10} ${parseInt(home) % 10}`);
    }
  }
} //end updateWinners

// Fill the top and sides with random numbers
let fillNumCells = (cells, array) => {
  // shuffle the array
  //shuffle(numArray);
  
  // Slap into table with data attr
  for (let i = 1; i < cells.length; i++){
    cells[i].innerHTML = array[i - 1];
    cells[i].dataset.scorenum = array[i - 1];
    cells[i].dataset.num = i;
  }
} //end fillNumCells

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
} //end shuffle