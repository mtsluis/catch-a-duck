let intervalId;
let isAnimating = false;
const dogElement = document.getElementById("dog");
const duckElement = document.getElementsByClassName("duck")[0];




window.onload = () => {
    
    moveDuck()
    
    //dogIntro();
}


duckElement.addEventListener('click', () => {
    duckElement.className = "duck";
    checkDuckType(duckElement.id);
});

//Visual methods
const moveDuck = () => {
    if (!intervalId) {
      intervalId = setInterval(changeDirection, 1000);
    }
}

const changeDirection = () => {
    let x = randomInt(-500, 500);
    let y = randomInt(-300, 300);

    checkDirection(x,y);
    duckElement.style.translate = x + 'px ' + y + 'px';
}


function randomInt(min, max) {
    let randomNumber = Math.round(Math.random() * (max - min)) + min;
    return Math.round(randomNumber / 50) * 50;
}
const checkDirection = (x, y) => {
    duckElement.style.rotate = "";
    duckElement.style.transform = "scale(2.5)";
    if (x > 0 && y > 0) {
        duckElement.style.rotate = "90deg";
        return
    }
    if (x < 0 && y > 0) {
        duckElement.style.rotate = "90deg";
        duckElement.style.transform = "scale(2.5) scaleY(-1)";
        return
    } 
    if (x < 0 && y < 0) {
        duckElement.style.transform = "scale(2.5) scaleX(-1)";
        return
    }
}

const dogIntro = () => {
    dogWalk();
    setTimeout(() => {
        dogSmell();
    }, 3000);
    setTimeout(() => {
        dogJump();
    }, 4900);
    setTimeout(() => {
        toggleDog();
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

const toggleDog = () => {
    dogElement.style.zIndex = "-1";
}

const checkDuckType = (duckType) => {
    switch (duckType) {
        case 'blue-duck':
            duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat 0px -236px';
            break;
        case 'black-duck':
            duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat -130px -236px';
            break;
        case 'red-duck':
            duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat -260px -236px';
            break;
    }
}
