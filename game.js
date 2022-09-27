var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var start = 0;

//call nextSequence() to generate pattern on pressing key 1st time or after game is over
$(document).keydown(function () { //$(document).one("keydown", function(){});
    if (!start)                 //it only execute event once per element 
    {
        start = 1;
        nextSequence();
    }
});

//increase level and generate random colour pattern if game is started or user completed previous pattern
function nextSequence() {

    level++;
    $("h1").text("Level " + level);

    userClickedPattern.length = 0; //reset user pattern bcz user needs to input fresh pattern from starting

    var randomNumber = Math.trunc(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

//detect user click on button and call checkAnswer 
$(".btn").click(function () {

    var userChosenColour = this.id; //var userChosenColour=$(this).attr("id");
    var size = userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    var lastClickedColour = size - 1;
    checkAnswer(lastClickedColour);
});

//match user pattern with game pattern each time (check last idx of user pattern with same idx of game pattern)
function checkAnswer(last) {

    if (userClickedPattern[last] !== gamePattern[last]) { //if wrong input anytime, game over and now restart after user presses key by calling startOver()

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press any key to restart");

        startOver();
    }
    else { //if user last entered colour correct then check if user has completed pattern   

        //if not completed then wait for more inputs and check them

        if (last + 1 === gamePattern.length) { //else generate next gamePattern

            setTimeout(function () {
                nextSequence();
            }, 1000);
        };
    }
}

function startOver() { //reset game pattern and level and start so that now on detecting keypress event handler works

    level = 0;
    start = 0;
    gamePattern.length = 0;
}

function playSound(name) {

    var colorSound = new Audio("sounds/" + name + ".mp3");
    colorSound.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}