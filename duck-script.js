let duckMoveIntervalId;
let roundIntervalId;
let duckDirectionCounter = 1;
let duckMoveChangeInterval = 1000;

let gamePaused = false;
let round = 1; //game rounds
let turns = 0; //number of turns in a round
let score = 0; //game score
let bullets = 3;
let ducksSpawned = 0; //ducks spawned in a round
let ducksShot = 10;
let ducksToWin = 6;
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
const startButtonElement = document.getElementsByClassName("start")[0];
const roundPanelElement = document.getElementsByClassName("round-container")[0];
let duckElement;


//WINDOW LOAD

/* ### uncomment to start the game ### */

startButtonElement.addEventListener('click', (event) => {
    event.stopPropagation();
    startButtonElement.style.display = "none";
    dogIntro();
    setTimeout(() => {
        playGame();
    }, 10000);
    window.onclick = handleWindowClick;
}); 

//Game logic methods

function handleWindowClick(event) {
    if (bullets > 0 && !gamePaused && event.target !== buttonResume) {
        bullets--;
        updateBulletsImgs();
        shotSound();
    }
}

//TODO add perfect round alert
//TODO add game over logic and screen

function duckScore(ducks, round) { //score for each duck
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
    if (ducksShot < ducksToWin) {
        toggleMessage(gameOverAlert);
        dogLaugh();
        setTimeout(() => {
        window.location.href = "menu.html";    
        }, 7000);
        return
    }
    roundAlertElement.innerHTML = "ROUND " + round;
    toggleMessage(roundAlertElement);
    updateRound();
    ducksSpawned = 0;
    ducksShot = 0;
    resetDuckBoard();
    updateDucksToWin(round);
    setTimeout(() => {
        toggleMessage(roundAlertElement);
        spawnDuck();
    }, 2000);
}

const playGame = () => {
    playRound();
}

const updateDucksToWin = (nRounds) => {
    if (nRounds > 19) {
        ducksToWin = 10;
        selectDuckstoWin(ducksToWin);
    } else if (nRounds > 14) {
        ducksToWin = 9;
        selectDuckstoWin(ducksToWin);
    } else if (nRounds > 12) {
        ducksToWin = 8;
        selectDuckstoWin(ducksToWin);
    } else if (nRounds > 10) {
        ducksToWin = 7;
        selectDuckstoWin(ducksToWin);
    } else if (nRounds > 0) {
        ducksToWin = 6;
        selectDuckstoWin(ducksToWin);
    }
}

function selectDuckstoWin(ducksToWin){
    let minDucks = document.querySelectorAll('.min-ducks');
    for (let i = 0; i < minDucks.length - ducksToWin; i++) {
        if (minDucks[i]) {
            minDucks[i].remove();
        }
    }
}



//Visual methods
const toggleMessage = (element) => {
    element.classList.toggle('hidden');
}

//Duck
const flyAndQuackSound = new Audio('sounds/quack_fly.mp3');
let isPlaying = false;
let fall = false;
let flyAway = false;

// duck sound : loop / stop loop
const duckSoundLoop = () => {
    if (!flyAndQuackSound.paused) return;
    flyAndQuackSound.currentTime = 0;
    flyAndQuackSound.play();
    flyAndQuackSound.onended = duckSoundLoop;
}

const stopLoop = () => {
    isPlaying = false;
    flyAndQuackSound.pause();
    flyAndQuackSound.currentTime = 0;
}


const toggleSkyColor = (color) => {
    bodyElement.style.backgroundColor = color;
}

const updateScore = () => {
    let duckScoreIncrement = duckScore(duckElement.id, round);
    score += duckScoreIncrement
    document.getElementsByClassName("score")[0].innerHTML = score;
}

const updateRound = () => {
    roundPanelElement.innerHTML = `R${round}`;
}

//Duck
const spawnDuck = () => {
    toggleSkyColor("rgb(78, 157, 231)");
    resetBullets();
    dogElement.className = "";
    if (ducksSpawned === 10) {
        round++;
        playRound();
        return
    }
    createDuck();
    duckElement = document.getElementsByClassName("duck")[0];
    duckAddEvent(duckElement);
    isPlaying = true;
    duckSoundLoop();
    duckMoveIntervalId = setInterval(changeDirection, duckMoveChangeInterval);

    
    const stopLoopIntervalId = setInterval(() => {
        if(fall || flyAway) {
            stopLoop();
            clearInterval(stopLoopIntervalId);
        }
    }, 100);
}

const removeDuck = () => {
    bodyElement.removeChild(duckElement);
}

const duckAddEvent = (element) => {
    duckElement.addEventListener('click', () => {
        if (bullets < 1 || gamePaused) {
            return;
        }
        duckElement.className = "duck";
        checkDuckType(duckElement.id);
        clearInterval(duckMoveIntervalId);
        changeDuckBoardColor();
        updateScore();
        ducksSpawned++;
        ducksShot++;
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
        }, 3500);
    });
} 
const changeDirection = () => {
    if (duckDirectionCounter === 5) {
        clearInterval(duckMoveIntervalId);
        duckMoveIntervalId = null;
        setTimeout(() => {
            duckEscape();
            dogLaugh();
            ducksSpawned++;
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
    /* if (x < 0) {
        duckElement.className = "duck horizontal";
        duckElement.style.transform = "scale(3) scaleY(-1)";
        return
    } */ 
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

const fallSound = new Audio('sounds/dead_duck_fall.mp3');

const duckFall = (isShot) => {
    checkDuckType(duckElement.id, isShot);
    const currentX = duckElement.getBoundingClientRect().x;
    duckElement.style.translate = `calc(${currentX}px - 45vw) 16vh`;
    //sound method
    fallSound.play();
    fall = true;
}

const duckEscape = () => {
    duckElement.className = "duck vertical";
    const currentX = duckElement.getBoundingClientRect().x;
    duckElement.style.translate = "calc(" + currentX + "px - 45vw) -120vh";
    toggleSkyColor("pink");
    toggleMessage(flyAwayAlert);
    flyAway = true;
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
const dog = document.getElementById('dog');
const barkSound = document.getElementById('dog-bark');
const laughSound = new Audio('sounds/dog_laugh.mp3');
const catchSound = new Audio('sounds/dog_catch_duck.mp3');

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
    }, 9500);    
}

const dogWalk = () => {
    dogElement.className = "walk";
}

const dogSmell = () => {
    dogElement.className = "smell";
}

const dogJump = () => {
    dogElement.className = "jump";
    //sound method
    setTimeout(() => {
        barkSound.play();
    }, 1500);
}

const dogHide = () => {
    dogElement.style.zIndex = "5";
}

const dogCatch = () => {
    dogElement.className = "catch";
    //sound method
    catchSound.play();
    dogHide();
}

const dogLaugh = () => {
    dogElement.className = "laugh";
    //sound method
    laughSound.play();
    dogHide();
}

//Game HUD
function updateBulletsImgs(){
    let bulletsImgs = document.querySelectorAll('.bullets');
    if(bulletsImgs[bullets]){
        bulletsImgs[bullets].classList.remove('bullets');
    }
}

function resetBullets() {
    bullets = 3;
    let bulletDivElement = document.querySelector('.shot-container').children;
    Array.from(bulletDivElement).forEach((bulletImg) => {
        if (bulletImg.className === "") {
            bulletImg.classList.add('bullets');
        }
    });
}

function changeDuckBoardColor(){
    let duckItems = document.querySelectorAll('.duck-item');
    if (duckItems[ducksSpawned]) {
        duckItems[ducksSpawned].classList.add('duck-red');
    }
}

const roundClearSound = new Audio('sounds/round_clear.mp3');
function resetDuckBoard() {
    let duckItems = document.querySelectorAll('.duck-red');
    duckItems.forEach((duckItem) => {
        duckItem.classList.remove('duck-red');
    });
    if(round > 1) {
        roundClearSound.play();
    }
}

//Misc methods
const randomInt = (min, max) => {
    let randomNumber = Math.round(Math.random() * (max - min)) + min;
    return Math.round(randomNumber / 15) * 15;
}

const audio = new Audio("sounds/gun_shot.mp3");

function shotSound() {
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