const boardElement = document.getElementById("background");
const dogElement = document.getElementById("dog");




window.onload = () => {
    

}




//Visual methods
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