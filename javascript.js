// SET UP

// Define the choices and their numerical values in a dict
const choices = {
    rock: 0,
    paper: 1,
    scissors: 2
};

const outcomes = [
    /* rock    paper   scissors */
    /*-------------------------*/
    /* rock    */ [0, -1, 1],
    /* paper   */ [1, 0, -1],
    /* scissors */ [-1, 1, 0]
];

document.addEventListener("DOMContentLoaded", function() {
    const rockButton = document.getElementById("rock_button");
    const paperButton = document.getElementById("paper_button");
    const scissorsButton = document.getElementById("scissors_button");
  
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

function getComputerChoice() {
    // Convert object keys to an array
    const keysArray = Object.keys(choices);

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * 3);

    // Use the random index to get a random property
    const randomProperty = keysArray[randomIndex];

    // Get the value associated with the random property
    // = computerChoice is either rock, paper, or scissors
    //const computerChoice = randomProperty;
    //console.log(computerChoice)
    return randomProperty;
};
    
var playerCurrentScore = 0, computerCurrentScore = 0;
const playerScoreDisplay = document.getElementById("playerScore");
const computerScoreDisplay = document.getElementById("computerScore");

function playRounds(playerChoice, computerChoice) {
    // playerValue and computerValue should be numbers
    const playerValue = choices[playerChoice]
    const computerValue = choices[computerChoice];
    console.log(playerValue, playerChoice)
    console.log(computerValue, choices[computerChoice]  )
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