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
    intro.play();
}
