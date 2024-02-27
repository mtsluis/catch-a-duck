let topScores = 1000;
document.querySelector('.menu-scores').textContent = topScores;

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


