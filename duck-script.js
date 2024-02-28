let intervalId;
let duckCounter = 0;
const dogElement = document.getElementById("dog");
const duckElement = document.getElementsByClassName("duck")[0];




window.onload = () => {
    moveDuck();
    
    //dogIntro();
}


duckElement.addEventListener('click', () => {
    duckElement.className = "duck";
    checkDuckType(duckElement.id);
    clearInterval(intervalId);
    intervalId = null;
    setTimeout(() => {
        duckFall(true);
    }, 500);
});


//Visual methods
const moveDuck = () => {
    if (!intervalId) {
      intervalId = setInterval(changeDirection, 1000);
    }
}

const changeDirection = () => {
    if (duckCounter === 6) {
        clearInterval(intervalId);
        intervalId = null;
    }
    let x = randomInt(-40, 45);
    if (duckCounter === 0) {
        duckElement.style.translate = x + 'vw ' + '-50vh';
        duckCounter++;
        return
    } 

    let y = randomInt(-10, -75);
    checkDirection(x,y);
    duckElement.style.translate = x + 'vw ' + y + 'vh';
    duckCounter++;
}

const checkDirection = (x, y) => {
    duckElement.style.rotate = "0deg";
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

const checkDuckType = (duckType, isShot) => {
    switch (duckType) {
        case 'blue-duck':
            if (isShot === true) {
                duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat -38px -236px';
                break
            }
            duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat 0px -236px';
            break;
        case 'black-duck':
            if (isShot === true) {
                duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat -168px -236px';
                break
            }
            duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat -130px -236px';
            break;
        case 'red-duck':
            if (isShot === true) {
                duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat -298px -236px';
                break
            }
            duckElement.style.background = 'url("imgs/dog-duck-sprite.png") no-repeat -260px -236px';
            break;
    }
}

const duckFall = () => {
    checkDuckType(duckElement.id, true);
    var rect = duckElement.getBoundingClientRect();

    // the position related to the viewport
    const x = rect.x;
    const y = rect.y;
    duckElement.style.translate = "calc(" + x + "px - 45vw) 15vh";
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

const randomInt = (min, max) => {
    let randomNumber = Math.round(Math.random() * (max - min)) + min;
    return Math.round(randomNumber / 10) * 10;
}