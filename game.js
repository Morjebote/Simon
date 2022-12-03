gamePattern = [];
userPattern = [];
var btnClrs = ["blue", "green", "red", "yellow"];
var level = 0;
var wait = 0;
var timeoutId;

$(document).keydown(function(key){
    if(key.keyCode == 32){
        key.preventDefault();
        startGame();
    }
});

function startGame(){
    if (level == 0){
        level++;
        $("h1").text("Level " + level);
        setTimeout(function(){
            nextSequence();
        }, 200);
        buttonClick();
    }
}

function nextSequence(){
    level++;
    userPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = btnClrs[randomNumber];
    gamePattern.push(randomColor);
    var activeButton = $("#" + randomColor);
    playSound(randomColor);
    buttonAnimation(activeButton, randomColor);
}

function playSound(clr){
    var btnPly = new Audio("sounds/" + clr + ".mp3");
    btnPly.play();
}

function buttonAnimation(btnPrss, clr){
    var activeClass = (clr + "-button-active");
    btnPrss.addClass(activeClass);
    setTimeout(function(){
        btnPrss.removeClass(activeClass);
    }, 200);
}

function buttonClick(){
    $("button").click(function(e){
        n = 0;
        var userColor = e.currentTarget.id;
        var pressedButton = $("#" + userColor);
        playSound(userColor);
        buttonAnimation(pressedButton, userColor);
        userPattern.push(userColor);
        checkAnswer(userPattern.length - 1);
    })
}

function checkAnswer(lvl){
    if(gamePattern[lvl] === userPattern[lvl]){
        if(gamePattern.length === userPattern.length){
            timeoutId = setTimeout(function(){
                showSequence();
            }, 1000)
        }
    }else{
        gameOver();
    }
}

function showSequence(){
    $("h1").text("Level " + level);
    playSound("level");
    wait = 1000;
    for (let i = 0; i < gamePattern.length; i++){
        let patClr = gamePattern[i];
        let patBtn = $("#" + patClr);
        setTimeout(function(){
            playSound(patClr);
            buttonAnimation(patBtn, patClr);
        }, wait);
        wait = wait + 400;
    }
    setTimeout(function(){
        nextSequence();
    }, wait);
}

function gameOver(){
    clearTimeout(timeoutId);
    $("button").off();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 500);
    $("h1").addClass("h1-over");
    $(".game-over-text").removeClass("hidden");
    playSound("game-over");
    $(document).keydown(function(){
        location.reload()
    });
}