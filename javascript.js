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
    const rockButton = document.getElementById("rock");
    const paperButton = document.getElementById("paper");
    const scissorsButton = document.getElementById("scissors");
  
    rockButton.addEventListener("click", function() {
      playerChoice = rock
    });
  
    paperButton.addEventListener("click", function() {
      playerChoice = paper
    });
  
    scissorsButton.addEventListener("click", function() {
      playRounds(scissors, getComputerChoice())
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
    

function playRounds(playerChoice, computerChoice) {
    // playerValue and computerValue should be numbers
    const playerValue = choices[playerChoice]
    const computerValue = choices[computerChoice];
    console.log(playerValue)
    console.log(computerValue)
    const outcome = outcomes[playerValue][computerValue];

    if (outcome === 0) {
        return "It's a tie!";
    } else if (outcome === 1) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
};


// current issue: playerChoice isn't called ever
// getPlayerChoice: there's an event listener for all 3 buttons that update the variable playerChoice
// getComputerChoice: there's a randomizer that selects a choice
// calculator: turns both choices into numbers and runs it thru calculations

// the buttons need to be pressed first before any calculations can be made
// -> should I make the buttons as the trigger for the calculations? How to make it efficient?