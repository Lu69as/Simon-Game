var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).click(function() 
{
  if (!started) 
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() 
{
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) 
{

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () 
        {
          nextSequence();
        }, 1000);
      }
    } 
    else 
    {
      playSound("wrong");
      $("body").addClass("game-over");

      setTimeout(function () 
      {
        $("body").removeClass("game-over");
      }, 200);

      
      document.querySelector("#title").innerHTML ='You Failed!';
      setTimeout(() => { document.querySelector("#title").innerHTML = 'You got to level: ' + level }, 2000)
      setTimeout(() => { document.querySelector("#title").innerHTML = 'Click anywhere to try again!' }, 4000)
      
      setTimeout(() => { startOver() }, 4001);
    }
}


function nextSequence() 
{
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  document.querySelector("#title").innerHTML = 'Level: ' + level;
}

function animatePress(currentColor) 
{
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () 
  {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) 
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() 
{
  level = 0;
  gamePattern = [];
  started = false;
}

if (innerHeight > innerWidth)
{
  document.querySelector(".btn").classList.toggle("phone")
}