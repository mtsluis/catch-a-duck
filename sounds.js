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
    
    // Função para verificar se a classe 'hidden' foi removida da div 'game-over'
    function checkGameOver() {
        if (!gameOver.classList.contains('hidden')) {
            // Se a classe 'hidden' foi removida, reproduzir o áudio
            music.play();
        }
    }

    // Chamar a função quando a página é carregada
    checkGameOver();

    // Adicionar um observador de mutação para detectar mudanças na classe da div 'game-over'
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



// dog barking -> duck-script

//duck sound
/*const quackSound = new Audio('sounds/4_duck_quack.mp3');
quackSound.play();*/
 
 

//fly sound

// shot sound

// dead duck fall -> duck-script
