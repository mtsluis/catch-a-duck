// Bird animation

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const images = {};
images.player = new Image();
images.player.src = 'imgs/sprites/NES_-_Duck_Hunt_-_Ducks-removebg.png';
const characterActions = ['right','up right'];
const numberOfCharacters = 4;
const characters = [];

class character{
    constructor(){
        this.width = 36.4111;
        this.height = 42.25;
        this.frameY = 1;
        this.x = 0;
        this.y = 0;
        this.speed = (Math.random() * 1.5) + 3.5;
        this.action = characterActions[Math.floor(Math.random() * characterActions.length)];
        if(this.action === 'right'){
            this.frameX = 3;
        } else if(this.action === 'up right'){
            this.frameX = 0;
        }
    }
    draw(){
        drawSprite(images.player, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
        if(this.action === 'up right'){
            if(this.frameX < 2){ this.frameX++;
            }else this.frameX = 0;
        }else if(this.action === 'right'){
            if(this.frameX < 5){ this.frameX++;
            }else this.frameX = 3;
        }
    }
    update(){
        if(this.action === 'right'){
            if(this.x > canvas.width + this.width){
                this.x = 0 - this.width;
                this.y = Math.random() * (canvas.height - this.height);
            } 
            else {
                this.x += this.speed;
            }
        } else if(this.action === 'up right'){
            if(this.x < canvas.width + this.width && this.y > 0) {
                this.x += this.speed;
                this.y -= this.speed; 
            }
            else {
                this.x = 0 - this.width;
                this.y = Math.random() * (canvas.height - this.height);
            }
        }
        }
        

    }

    for(i = 0; i < numberOfCharacters; i++){
        characters.push(new character());
    }



function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i < characters.length; i++){
        characters[i].draw();
        characters[i].update();
    }
}

window.onload = setInterval(animate, 1000/60);

window.addEventListener('resize', function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

//UI interaction

let round = 1; //game rounds
let turns = 0; //number of turns in a round
let score = 0; //game score
let bullets = 3;
let duckDown = 0; //ducks down in a round
let topScores = 0; //score to increment if score is higher than top score
let blackDuckScore;
let blueDuckScore;
let redDuckScore;

let duck = document.getElementById("bird");

const ducks = ['bBlack', 'bBlue', 'bRed'];

let randomDuck = ducks[Math.floor(Math.random() * ducks.length)];

function assignRandomDuck() {
    let randomDuck = ducks[Math.floor(Math.random() * ducks.length)];
    duck.id = randomDuck;
    return randomDuck;
}

function reset_animation() {
    var elementAnimation = document.getElementById('bird');
    elementAnimation.style.animation = 'none';
    elementAnimation.offsetHeight; 
    elementAnimation.style.animation = null; 
  }

function duckScore(ducks, round){ //score for each duck

    if(round <= 5){
        switch(ducks){
            case 'bBlack':
                return blackDuckScore = 500;
            case 'bBlue':
                return blueDuckScore = 1000;
            case 'bRed':
                return redDuckScore = 1500;
        }
    } else if(round > 5 && round <= 10){
        switch(ducks){
            case 'bBlack':
                return blackDuckScore = 800;
            case 'bBlue':
                return blueDuckScore = 1600;
            case 'bRed':
                return redDuckScore = 2400;
        }
    } else{
        switch(ducks){
            case 'bBlack':
                return blackDuckScore = 1000;
            case 'bBlue':
                return blueDuckScore = 2000;
            case 'bRed':
                return redDuckScore = 3000;
        }
    }
}


function shootTurn(){
    
        window.onclick = handleWindowClick;
    }

function handleWindowClick(event) {
    window.onload = assignRandomDuck();
    if (bullets > 0) {
        bullets--;
        document.getElementById("currentBullets").innerHTML = bullets;
        play();
        
        if (event.target.nodeName === "IMG") {
            let duckScoreIncrement = duckScore(event.target.id, round);
            document.getElementById("ducksDown").innerHTML = "Duck Down: " + (++ duckDown);
            document.getElementById("scores").innerHTML = "Score: " + (score += duckScoreIncrement);
            event.target.style.display = "none"; 
        }
    }
}

function play() {
    const audio = document.querySelector('audio');
    if (audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0
    }
}


function topScore(score, topScores){
    if(score > topScores){
        topScores = score;
    } return topScores;
}

