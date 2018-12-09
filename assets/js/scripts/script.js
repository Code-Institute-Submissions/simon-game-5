var playerCount = [];
var gameCount = [];
var levels = 0;
const numOfLevels = 20;
var strictMode = false;
var error = false;
var errorCount = 0;
var gamePatternFinished;
var id;
var colors = [
    "#0059FF",
    "#5DFF00",
    "#C300FF",
    "#FFE100",
    "#FF0000",
    "#FF6A00"
];
var buttonSounds = [
    "assets/sounds/btn0.wav",
    "assets/sounds/btn1.wav",
    "assets/sounds/btn2.wav",
    "assets/sounds/btn3.wav",
    "assets/sounds/btn4.wav",
    "assets/sounds/btn5.wav"
];
var otherSounds = [
    "assets/sounds/win.mp3",
    "assets/sounds/best.mp3",
    "assets/sounds/lost.mp3",
    "assets/sounds/start.mp3",
    "assets/sounds/strict.mp3"
];




$(document).ready(function() {
    
    //Start the game
    $(".start").click(function() {
        strictMode = false;
        playOtherSound(3);
        $(".start").addClass("switch-active");
        $(".strict").removeClass("switch-active");
        $(".btn").removeClass("click-disabled").addClass("click-enabled");

        if (levels > 0) {
            playerCount = [];
            gameCount = [];
            levels = 1;
            error = false;
            generateGamePattern();
        }
        else if (levels === 0) {
            levels++;
            generateGamePattern();
        }
        
        remindPattern();
    });

    //Start the game in strict mode(no mistakes allowed)
    $(".strict").click(function() {
        strictMode = true;
        playOtherSound(4);
        $(".start").removeClass("switch-active");
        $(".strict").addClass("switch-active");
        $(".btn").removeClass("click-disabled").addClass("click-enabled");

        if (levels > 0) {
            playerCount = [];
            gameCount = [];
            levels = 1;
            error = false;
            generateGamePattern();
        }
        else if (levels === 0) {
            levels++;
            generateGamePattern();
        }
        
        remindPattern();
    });


    //When button clicked
    $(".btn").click(function() {
        
        id = $(this).attr("id");
        playButtonSound(id);
        $(this).css("background-color", colors[id]);
        setTimeout(function() {
            $("#" + id).css("background-color", "#111");
        }, 200);
        playerCount.push(+id);
        
         //Winning conditions for the game and what happens when a player has won
        if(playerCount.length === numOfLevels) {
            playWinSequence();
        }
        

        //When player makes a mistake
        if(playerCountCheck() === true) {
            error = false;
            
            /*
            Check to see if player's pattern matches the game's and 
            if it's not equal to the number of levels. Proceed to the next level
            */
            if (playerCount.length === gameCount.length && playerCount.length !== numOfLevels) {
                levels++;
                errorCount = 0;
                playerCount = [];
                generateGamePattern();
            }
        } else {
            errorCount++;
            
            //Reset game when player makes 3 mistakes during the same level
            if(errorCount === 3) {
                playOtherSound(2);
                displayError();
                errorCount = 0;
                delayGameReset();
            } else if(errorCount === 1 && strictMode === true) {
                //Reset game when player makes any mistake provided the game is started in strict mode
                playOtherSound(2);
                displayError();
                errorCount = 0;
                delayGameReset();
            } else {
                /*
                If above conditions not true, inform the player a mistake was 
                made and play the whole game pattern up until the current level allowing for another chance
                */
                displayError();
                error = true;
                playerCount = [];
                delayGenerateGamePattern();
            }
        }
    });
});



/*
Responsible for creating and playing the game's button pattern 
by taking a randomly generated number and based on that, picking a button to light up
*/
function generateGamePattern() {
    $(".counter").text(levels);
    
    if (error === false) {
        gameCount.push(generateRandomNumber());
    }
    
    var i = 0;
        
    var intervalId = setInterval(function() {
        gamePatternFinished = false;
        id = gameCount[i];
        playButtonSound(id);
        
        $(".btn").removeClass("click-enabled").addClass("click-disabled");
        i++;
        $("#" + id).css("background-color", colors[id]);
        
        setTimeout(function() {
            $("#" + id).css("background-color", "#111");
        }, 500);
    
        if (i >= gameCount.length) {
            clearInterval(intervalId);
            $(".btn").removeClass("click-disabled").addClass("click-enabled");
            gamePatternFinished = true;
        }
    }, 800);
}


//Generates random number then adds it to the gameCount array 
function generateRandomNumber() {
    var randomNum = Math.floor(Math.random() * 6);
    return randomNum;
}


//Check if the players input matches the game's pattern for all items in the array
function playerCountCheck() {
    for (var i = 0; i < playerCount.length; i++) {
        if (playerCount[i] !== gameCount[i]) {
            return false;
        }
    }
    return true;
}


//Inform the player a mistake was made
function displayError() {
    $(".btn").removeClass("click-enabled").addClass("click-disabled");

    if (errorCount === 3 || strictMode === true) {
        $(".counter").text("LOST");
    } else {
        $(".counter").text("--");
    }

    var count = 0;
    var intervalId = setInterval(function() {
        if ($(".counter").hasClass("hidden")) {
            $(".counter").removeClass("hidden").addClass("visible");
            count++;
            if (count === 2) {
                clearInterval(intervalId);
            }
        } else {
            $(".counter").removeClass("visible").addClass("hidden");
        }
    }, 200);
}

//Reset game and begin a new pattern
function resetGame() {
    playerCount = [];
    gameCount = [];
    levels = 1;
    error = false;
    generateGamePattern();
}

//Choose sounds to play from arrays of sounds
function playButtonSound(id) {
    var btnSound = new Audio(buttonSounds[id]);
    btnSound.play();
}

function playOtherSound(x) {
    var sound = new Audio(otherSounds[x]);
    sound.play();
}

//Inform the player the game has been won
function playWinSequence() {
    $(".counter").text("WIN");
    
    var winSound = new Audio(otherSounds[0]);
    winSound.play();
    
    var i = 0;

    var myInterval = setInterval(function() {
        var colorNum = gameCount[i];
        
        $(".btn").removeClass("click-enabled").addClass("click-disabled");
        $(".start").removeClass("switch-active").removeClass("click-enabled").addClass("click-disabled");
        $(".strict").removeClass("switch-active").removeClass("click-enabled").addClass("click-disabled");
        $(".counter").css("color", colors[colorNum]);
        
        i++;
        
        if(i === gameCount.length) {
            i = 0;
        }
        
        if(winSound.paused) {
            clearInterval(myInterval);
            $(".counter").css("color", "white");
            $(".start").removeClass("click-disabled").addClass("click-enabled");
            $(".strict").removeClass("click-disabled").addClass("click-enabled");
        }
    }, 300);
    
    setTimeout(function() {
        winSound.pause();
    }, 9999);
}

/*
Repeats the game pattern if the user is idle for too long.
Checks if the gamePattern has finished displaying, if it has, waits 7 seconds before repeating it 
*/
function remindPattern() {

    var idleTime = 0;
    
    //Resets idleTime on mouse movement to stop the pattern repeating indefinitely
    $(document).mousemove(function(){
        idleTime = 0;
    });
    
    /*
    Increments idleTime and if idleTime is greater than 1, plays game 
    pattern + flashes counter with "--" to signal to user to make a move.
    */
    function incrementIdleTime() {

        idleTime++;
            
        if(idleTime > 1) {
            error = true;
            generateGamePattern();
               
            setTimeout(function(){
                $(".counter").text(levels);
            }, 1000);
               
            $(".counter").text("--");
        }
    }
    
    /*
    Repeats the incrementIdleTime function constantly to allow it to check
    if the user is idle and clears itself on start of new game not allowing multiple
    instances of this function to run
    */
    function repeatIncrement() {

        $(".start").click(function(){
            clearTimeout(my_timeout);
        });
        $(".strict").click(function(){
            clearTimeout(my_timeout);
        });
            
        if(gamePatternFinished === true){
            incrementIdleTime();
        }
            
        var my_timeout = setTimeout(function() {
            repeatIncrement();
        }, 6000);
    }
        
    var my_timeout = setTimeout(function() {
        repeatIncrement();
    }, 6000);
}


//Delay pattern so that error has time to play
function delayGenerateGamePattern() {
    setTimeout(function() {
        generateGamePattern();
    }, 1200);
}

//Delay reset so that error has time to play
function delayGameReset(){
    setTimeout(function() {
        resetGame();
    }, 1200);
}

