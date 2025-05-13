// SET UP

// Define the choices and their numerical values in a dict
// choices is a dict that has the names of choices (rock, paper, or scissors)
// and assigns them a numerical value (0, 1, 2 respectively)
const choices = {
    rock: 0,
    paper: 1,
    scissors: 2
};

// a matrix (fancy word for grid :D) for choices and their numerical value (see choices the dict above)
// explanation on what the heck -1, 0, 1 means:
//    0: a tie
//    1: a player win, a computer loss
//    -1: a player loss, a computer win
// why -1, 0, 1?
//    calculate results with the matrix!
//    in choices, the values to each key are used as INDEXES in the const "outcomes"
//    for example, let's do rock.
//    rock in choices is 0.
//    if the computer chooses paper, the value for paper in choices is 1.
//    in the outcomes matrix, 0, 1 is rock, paper is -1.
//    -1 is a player loss!

const outcomes = [
    /*         | your (player) choice
    /*computer |   r   p   s */
    /*-------------------------*/
    /* rock    */ [0, -1, 1],
    /* paper   */ [1, 0, -1],
    /* scissors */ [-1, 1, 0]
];

document.addEventListener("DOMContentLoaded", function() {
    const rockButton = document.getElementById("rock_button");
    const paperButton = document.getElementById("paper_button");
    const scissorsButton = document.getElementById("scissors_button");
  
    // runs playRounds() whenever a rock paper scissors button is clicked, triggering the result calculation for the round
    rockButton.addEventListener("click", function() {
      playRounds("rock", getComputerChoice())
    });
  
    paperButton.addEventListener("click", function() {
      playRounds("paper", getComputerChoice())
    });
  
    scissorsButton.addEventListener("click", function() {
      playRounds("scissors", getComputerChoice())
    });

});

// Background Toggle Button
const video = document.getElementById('backgroundVideo');
const imageButton = document.getElementById('bgToggleImage');

let isImage1 = true; // the image/button is always "on" (moving) first

imageButton.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    bgToggleImage.src = "./resources/background-moving.png";
  } else {
    video.pause();
    bgToggleImage.src = "./resources/background-still.png";
  }
});

// Music Toggle Button
const backgroundAudio = document.getElementById('backgroundAudio');
const toggleMusicButton = document.getElementById('musicToggleImage');

let isMusicPlaying = false;

toggleMusicButton.addEventListener('click', () => {
  if (isMusicPlaying) {
    backgroundAudio.pause();
    musicToggleImage.src = "./resources/music-mute.png";
  } else {
    backgroundAudio.play();
    musicToggleImage.src = "./resources/music-on.png";
  }
  
  isMusicPlaying = !isMusicPlaying;
});


// Pages (toggling overlays)
// methodology: one function per button
// start -> tutorial -> game -> results
function togglePages(targetPage) {
  var pages = document.querySelectorAll('.page');
  
  pages.forEach(function(page) {
    // iterates thru the list and checks if that page is the targetpage. 
    if (page.id === targetPage) {
      page.classList.add('active'); // Turn on the target overlay
    } else {
      page.classList.remove('active'); // Turn off other overlays
    }
  });
}
  
function toggleTutorial(targetTutorial) {
  var tutorials = document.querySelectorAll('.tutorial');
  
  tutorials.forEach(function(tutorial) {
    // iterates thru the list and checks if that page is the targetpage. 
    if (tutorial.id === targetTutorial) {
      tutorial.classList.add('active'); // Turn on the target overlay
    } else {
      tutorial.classList.remove('active'); // Turn off other overlays
    }
  });
}



// ALGORITHM

// a really long-winded way for the computer to randomly choose "rock", "paper", "scissors" (yes, in string)
function getComputerChoice() {
    // Convert object keys to an array (looks like choice dict)
    const keysArray = Object.keys(choices);

    // Generate a random index (0, 1, 2)
    const randomIndex = Math.floor(Math.random() * 3);

    // Use the random index to get a random property (a string "rock", "paper", or "scissors")
    const randomProperty = keysArray[randomIndex];

    return randomProperty;
};
  
// initializing player and computer score to 0
var playerCurrentScore = 0, computerCurrentScore = 0;

// updates score display by html ID
const playerScoreDisplay = document.getElementById("playerScore");
const computerScoreDisplay = document.getElementById("computerScore");

// calculates the result of a round, and also the final result
function playRounds(playerChoice, computerChoice) {
    // playerValue and computerValue should be numbers
    const playerValue = choices[playerChoice]
    const computerValue = choices[computerChoice];
    console.log("player value (number 0, 1, 2): " + playerValue)
    console.log("player choice ('rock', 'paper', or 'scissors): ", playerChoice)
    console.log("---")
    console.log("computer value (number 0, 1, 2): " + computerValue)
    console.log("computer choice ('rock', 'paper', or 'scissors): " + computerChoice)
    console.log("-----")

    const outcome = outcomes[playerValue][computerValue];
    console.log(outcome)

    if (outcome === 0) {
        console.log("It's a tie!");
        playerScoreDisplay.textContent = ++playerCurrentScore //use prefix here to use the new incremented number (postfix count++ would've outputed the old number then incremented)
        computerScoreDisplay.textContent = ++computerCurrentScore
    } else if (outcome === 1) {
        console.log("You win!");
        playerScoreDisplay.textContent = ++playerCurrentScore
    } else {
        console.log("Computer wins!");
        computerScoreDisplay.textContent = ++computerCurrentScore
    }

    if (playerCurrentScore == 5 || computerCurrentScore == 5) {
      document.getElementById("rock_button").disabled = true;
      document.getElementById("paper_button").disabled = true;
      document.getElementById("scissors_button").disabled = true;
      if (computerCurrentScore == 5) {
        console.log("Aw, the computer won! awwawawa");
      } else {
        console.log("You're the winner! wowowow");
      }
    };


};


// current issue: playerChoice isn't called ever
// getPlayerChoice: there's an event listener for all 3 buttons that update the variable playerChoice
// getComputerChoice: there's a randomizer that selects a choice
// calculator: turns both choices into numbers and runs it thru calculations

// the buttons need to be pressed first before any calculations can be made
// -> should I make the buttons as the trigger for the calculations? How to make it efficient?

// NEXT IMMEDIATE TASK: make a score board
// make an element which displays text (a number) that changes
// attach that changing variable to playRounds