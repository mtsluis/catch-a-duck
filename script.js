const boardElement = document.getElementById("background");
const dogElement = document.getElementById("dog");




window.onload = () => {
    dogIntro();
}




//Visual methods
const dogIntro = () => {
    dogWalk();
    setTimeout(() => {
        dogSmell();
    }, 3000);
    setTimeout(() => {
        dogJump();
    }, 5000);
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
    dogElement.style.display = "none";
}