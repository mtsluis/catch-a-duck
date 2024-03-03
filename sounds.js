//menu music
function menuMusic() {
    const menu = document.querySelector('#menu-music');
    menu.play();
}
window.addEventListener("dblclick", menuMusic);


// start game
function startGame() {
    const audio = document.getElementById("start-game");
    audio.play();
    setTimeout(() => {
        window.location.href = "index.html";
    }, 100);
}


//intro music
function introMusic() {
    const intro = document.getElementById('intro-music');
    const button = document.getElementById('start-btn');
    
    intro.play();
    
    intro.addEventListener('ended', () => {
        button.parentNode.removeChild(button);
    });
}


//game over music
document.addEventListener('DOMContentLoaded', function() {
    const gameOver = document.querySelector('.game-over');
    const music = document.getElementById('game-over-music');
    const failedSound = new Audio('sounds/failed.mp3');

    function checkGameOver() {
        if (!gameOver.classList.contains('hidden')) {
            setTimeout(() => {
                failedSound.play();
            }, 800);
            setTimeout(() => {
                music.play();
            }, 2300);
        }
    }

    checkGameOver();

    const observer = new MutationObserver(checkGameOver);
    observer.observe(gameOver, { attributes: true, attributeFilter: ['class'] });
});

//perfect score sound
document.addEventListener('DOMContentLoaded', function() {
    const perfectScore = document.querySelector('.perfect-score');
    const sound = document.getElementById('perfect-score-sound');

    function checkPerfectScore() {
        if(!perfectScore.classList.contains('hidden')) {
            sound.play();
        }
    }

    checkPerfectScore();

    const observer = new MutationObserver(checkPerfectScore);
    observer.observe(perfectScore, { attributes: true, attributeFilter: ['class'] });
});





