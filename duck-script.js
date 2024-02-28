let intervalId;
let duckDirectionCounter = 1;
let duckDirectionInterval = 1000;

const bodyElement = document.body;
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
      intervalId = setInterval(changeDirection, duckDirectionInterval);
    }
}

const changeDirection = () => {
    if (duckDirectionCounter === 5) {
        clearInterval(intervalId);
        intervalId = null;
        setTimeout(() => {
            duckEscape();
        }, duckDirectionInterval);
    }

    let x = randomInt(-40, 45);
    if (duckDirectionCounter === 0) {
        duckElement.style.translate = x + 'vw ' + '-50vh';
        duckDirectionCounter++;
        return
    } 

    let y = randomInt(-10, -75);
    checkDirection(x,y);
    duckElement.style.translate = x + 'vw ' + y + 'vh';
    duckDirectionCounter++;
}

const checkDirection = (x, y) => {
    //FIXME fix visual direction 
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

const duckFall = (isShot) => {
    checkDuckType(duckElement.id, isShot);
    const currentX = duckElement.getBoundingClientRect().x;
    duckElement.style.translate = "calc(" + currentX + "px - 45vw) 16vh";
}

const duckEscape = () => {
    duckElement.className = "duck vertical";
    const currentX = duckElement.getBoundingClientRect().x;
    duckElement.style.translate = "calc(" + currentX + "px - 45vw) -120vh";
    //TODO add fly away Message div 
    bodyElement.style.backgroundColor = "pink";

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
    dogElement.style.zIndex = "5";
}

const randomInt = (min, max) => {
    let randomNumber = Math.round(Math.random() * (max - min)) + min;
    return Math.round(randomNumber / 10) * 10;
}