/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, domScore, domCurrent, isPlaying;

function startNewGame() {
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    isPlaying = true;
    document.getElementsByClassName("dice")[0].style.display = "none";
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
}

startNewGame();

document.getElementsByClassName("btn-roll")[0].addEventListener("click", function () {

        if (isPlaying) {
            // 1. Update random number
            var dice = (Math.floor(Math.random() * 6)) + 1;
            var diceDom = document.getElementsByClassName("dice")[0];
            domScore = document.getElementById("score-" + activePlayer);
            domCurrent = document.getElementById("current-" + activePlayer);

            // 2. Set RN to the window
            domCurrent.textContent = dice;
            diceDom.style.display = "block";
            diceDom.src = "dice-" + dice + ".png";

            // 3. Update roundScore if it isn't = 1

            if (dice !== 1) {
                roundScore += dice;
                domCurrent.textContent = roundScore;
            } else {
                switchPlayer();
                domCurrent.textContent = 0;
            }
        }
    }
);


document.getElementsByClassName("btn-hold")[0].addEventListener("click", function () {

    if (activePlayer === 0) {
        scores[0] += roundScore;
        domScore.textContent = scores[0];
        checkWinner(scores[0]);
    } else {
        scores[1] += roundScore;
        domScore.textContent = scores[1];
        checkWinner(scores[1]);
    }

    switchPlayer();


});

function checkWinner(avaibleNumber) {

    if (avaibleNumber >= 20) {
        document.getElementById("name-" + activePlayer).textContent = "Player " + (activePlayer + 1) + " Winner !";
        isPlaying = false;
    }

}

function switchPlayer() {
    if (activePlayer === 0) {
        roundScore = 0;
        domCurrent.textContent = 0;
        activePlayer = 1;
    } else {
        roundScore = 0;
        domCurrent.textContent = 0;
        activePlayer = 0;
    }

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";


}

document.getElementsByClassName("btn-new")[0].addEventListener("click", function () {

    // document.getElementById("name-" + activePlayer).textContent = "Player " + (activePlayer + 1 + "");
    startNewGame();

});