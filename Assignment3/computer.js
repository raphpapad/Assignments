"use strict";

function computer_plays() {
    play_with_computer = prompt("If you want to play with computer write Yes else press the cancel button.");

	document.querySelector("p.play_with_computer").innerHTML = play_with_computer;
}

function computer_playing() {
    if (game.plays == "player2") {
        zari_arithmoi();
        updateGUI_innerHTML();
        changePosition();
    }
}
