let duckMoveIntervalId;
let roundIntervalId;
let duckDirectionCounter = 1;
let duckMoveChangeInterval = 1000;

let gamePaused = false;
let round = 1; //game rounds
let turns = 0; //number of turns in a round
let score = 0; //game score
let bullets = 3;
let duckCount = 0; //ducks spawned in a round
let topScores = 0; //score to increment if score is higher than top score
let blackDuckScore;
let blueDuckScore;
let redDuckScore;
const ducks = ['red', 'blue', 'black'];

//html elements
const bodyElement = document.body;
const dogElement = document.getElementById("dog");
const roundAlertElement = document.getElementsByClassName("round-alert")[0];
const perfectScoreAlert = document.getElementsByClassName("perfect-score")[0];
const flyAwayAlert = document.getElementsByClassName("fly-away")[0];
const gameOverAlert = document.getElementsByClassName("game-over")[0];
let duckElement;


//Game logic methods
window.onclick = handleWindowClick;

function handleWindowClick(event) {
    if (bullets > 0 && !gamePaused && event.target !== buttonResume) {
        bullets--;
        play();
    }
    //BUG bird can still be shot after bullets run out
}

//TODO add perfect round alert
//TODO add game over logic and screen

function duckScore(ducks, round){ //score for each duck
    if(round <= 5){
        switch(ducks){
            case 'black-duck':
                return blackDuckScore = 500;
            case 'blue-duck':
                return blueDuckScore = 1000;
            case 'red-duck':
                return redDuckScore = 1500;
        }
    } else if(round > 5 && round <= 10){
        switch(ducks){
            case 'black-duck':
                return blackDuckScore = 800;
            case 'blue-duck':
                return blueDuckScore = 1600;
            case 'red-duck':
                return redDuckScore = 2400;
        }
    } else{
        switch(ducks){
            case 'black-duck':
                return blackDuckScore = 1000;
            case 'blue-duck':
                return blueDuckScore = 2000;
            case 'red-duck':
                return redDuckScore = 3000;
        }
    }
}

function topScore(score, topScores){
    if(score > topScores){
        topScores = score;
    } return topScores;
}

const playRound = () => {
    roundAlertElement.innerHTML = "ROUND " + round;
    toggleMessage(roundAlertElement);
    setTimeout(() => {
        toggleMessage(roundAlertElement);
        spawnDuck();
    }, 1000);
}

const playGame = () => {
    playRound();
    round++;
}

//Visual methods
const toggleMessage = (element) => {
    element.classList.toggle('hidden');
}

const toggleSkyColor = (color) => {
    bodyElement.style.backgroundColor = color;
}

const updateScore = () => {
    let duckScoreIncrement = duckScore(duckElement.id, round);
    score += duckScoreIncrement
    document.getElementsByClassName("score")[0].innerHTML = score;
}
//Duck
const spawnDuck = () => {
    toggleSkyColor("rgb(78, 157, 231)")
    if (duckCount === 10) {
        return
    }
    createDuck();
    duckElement = document.getElementsByClassName("duck")[0];
    duckAddEvent(duckElement);
    duckMoveIntervalId = setInterval(changeDirection, duckMoveChangeInterval);
}

const removeDuck = () => {
    bodyElement.removeChild(duckElement);
}

const duckAddEvent = (element) => {
    duckElement.addEventListener('click', () => {    
        duckElement.className = "duck";
        checkDuckType(duckElement.id);
        clearInterval(duckMoveIntervalId);
        updateScore();
        //FIXME check conflict with window event to prevent duplicate count
        duckCount++;
        setTimeout(() => {
            duckFall(true);
        }, 350);
        setTimeout(() => {
            duckDirectionCounter = 0;
            dogCatch();
            removeDuck();
        }, 2000);
        setTimeout(() => {
            spawnDuck();
        }, 3000);
    });
} 
const changeDirection = () => {
    if (duckDirectionCounter === 5) {
        clearInterval(duckMoveIntervalId);
        duckMoveIntervalId = null;
        setTimeout(() => {
            duckEscape();
            dogLaugh();
            duckCount++;
            duckDirectionCounter = 0;
        }, duckMoveChangeInterval);
        setTimeout(() => {
            removeDuck();
            toggleMessage(flyAwayAlert);
            spawnDuck();
        }, 3500);
    }

    const x = randomInt(-40, 45);
    if (duckDirectionCounter === 0) {
        duckElement.style.translate = `${x}vw -50vh`;
        duckDirectionCounter++;
        return
    } 

    const y = randomInt(-10, -75);
    checkDirection(x,y);
    duckElement.style.translate = `${x}vw ${y}vh`;
    duckDirectionCounter++;
}

const checkDirection = (x, y) => {
    //FIXME fix visual direction 
    const currentX = duckElement.getBoundingClientRect().x;
    const currentY = duckElement.getBoundingClientRect().y;
    duckElement.style.rotate = "0deg";
    duckElement.style.transform = "scale(3)";
    if (x > currentX) {
        duckElement.className = "duck horizontal";
        duckElement.style.transform = "scale(3) scaleY(-1)";
        
        return
    } 
    if (x < 0 && y < 0) {
        duckElement.style.transform = "scale(3) scaleX(-1)";
        return
    }
}

const checkDuckType = (duckType, isShot) => {
    switch (duckType) {
        case 'blue-duck':
            if (isShot === true) {
                duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat -38px -236px';
                break;
            }
            duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat 0px -236px';
            break;
        case 'black-duck':
            if (isShot === true) {
                duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat -168px -236px';
                break;
            }
            duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat -130px -236px';
            break;
        case 'red-duck':
            if (isShot === true) {
                duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat -298px -236px';
                break;
            }
            duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat -260px -236px';
            break;
    }
}

const duckFall = (isShot) => {
    checkDuckType(duckElement.id, isShot);
    const currentX = duckElement.getBoundingClientRect().x;
    duckElement.style.translate = `calc(${currentX}px - 45vw) 16vh`;
}

const duckEscape = () => {
    duckElement.className = "duck vertical";
    const currentX = duckElement.getBoundingClientRect().x;
    duckElement.style.translate = "calc(" + currentX + "px - 45vw) -120vh";
    toggleSkyColor("pink");
    toggleMessage(flyAwayAlert);
}

const createDuck = () => {
    const duckDiv = document.createElement('div');
    duckDiv.className = "duck diagonal";
    duckDiv.setAttribute("id", assignRandomDuck())
    bodyElement.appendChild(duckDiv);
} 

function assignRandomDuck() {
    let randomDuck = ducks[Math.floor(Math.random() * ducks.length)];
    return randomDuck + "-duck";
}

//Dog
const dogIntro = () => {
    dogWalk();
    setTimeout(() => {
        dogSmell();
    }, 3000);
    setTimeout(() => {
        dogJump();
    }, 4900);
    setTimeout(() => {
        dogHide();
    }, 9900);    
}

const dogWalk = () => {
    dogElement.className = "walk";
}

const dogSmell = () => {
    dogElement.className = "smell";
}

const dogJump = () => {
    dogElement.className = "jump";
}

const dogHide = () => {
    dogElement.style.zIndex = "5";
}

const dogCatch = () => {
    dogElement.className = "catch";
    dogHide();
}

const dogLaugh = () => {
    dogElement.className = "laugh";
    dogHide();
}


//Misc methods
const randomInt = (min, max) => {
    let randomNumber = Math.round(Math.random() * (max - min)) + min;
    return Math.round(randomNumber / 15) * 15;
}

const audio = new Audio("sounds/gun_shot.mp3");

function play() {
    if (!gamePaused && audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0
    }
}

//Pause game
//Pause
let paused = false;

const pausediv = document.createElement('div');
pausediv.className = "pause";
const pauseParagraph = document.createElement('p');
const nodePause = document.createTextNode("PAUSE");
pauseParagraph.appendChild(nodePause);
pausediv.appendChild(pauseParagraph);
const buttonResume = document.createElement('button');
const buttonQuit = document.createElement('button');
buttonResume.className = "button-resume";
buttonQuit.className = "button-quit";
const nodeResume = document.createTextNode("Resume");
const nodeQuit = document.createTextNode("Quit");
buttonResume.appendChild(nodeResume);
buttonQuit.appendChild(nodeQuit);
pausediv.appendChild(buttonResume);
pausediv.appendChild(buttonQuit);

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        if (paused) {
            unpause();
            paused = false;
        } else {
            pause();
            paused = true;
        }
    }
});

buttonResume.addEventListener('click', function() {
    unpause();
});

buttonQuit.addEventListener('click', function() {
    window.location.href = "menu.html";
});

function pause() {
    const dogDiv = document.getElementById("dog");

    dogDiv.insertAdjacentElement('afterend', pausediv);
    console.log("Paused");
    clearInterval(duckMoveIntervalId);
    duckMoveIntervalId = null;

    audio.pause();
    gamePaused = true;
}

function unpause() {
    pausediv.remove();
    console.log("Unpaused");

    if (!duckMoveIntervalId) {
        duckMoveIntervalId = setInterval(changeDirection, duckMoveChangeInterval);
    }

    gamePaused = false;
}



//WINDOW LOAD
dogIntro();
setTimeout(() => {
    playGame();
}, 10000);