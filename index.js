var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Next sequence
function nextSequence() {
  userClickedPattern = []; // reset for each new round
  level++;
  document.querySelector("h1").innerText = "Level " + level;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);

  // select the correct button
  var button = document.querySelector("." + randomChosenColour);
  flash(button);
}

// Flash effect
function flash(button) {
  button.classList.add("pressed");
  setTimeout(function () {
    button.classList.remove("pressed");
  }, 200);
}

// Detect user clicks
document.querySelectorAll(".btn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    var userChosenColour = this.id;  // green/red/yellow/blue
    userClickedPattern.push(userChosenColour);

    flash(this);
    console.log("User sequence:", userClickedPattern);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });
});

// Start game on key press
document.addEventListener("keydown", function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentIndex) {
  // 1. Check the most recent user click
  if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
    console.log("success");

    // 2. If user has finished the sequence correctly
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    document.querySelector("#level-title").textContent =
      "Game Over, Press Any Key to Restart";
      document.body.classList.add("game-over");
      setTimeout(function () {
    document.body.classList.remove("game-over");
  }, 300);
  var wrongSound = new Audio("sounds/wrong.mp3");
  wrongSound.play(); 


    // restart game
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name)
{
    var sound = new Audio("sounds/"+ name + ".mp3");
    sound.play();
}

