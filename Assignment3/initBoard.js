"use strict";

const game = {
	arithmos_zariou: 0,
	plays: "player1", // paizei o 1 paikths
	position1: 0,
	position2: 0,
	winner: false, // kanenas nikitis akoma
	previous1: 0,
	previous2: 0,
	python_effect1: false,
	python_effect2: false
  };

var player1;
var player2;

var play_with_computer = "";

var count1 = 0;
var count2 = 0;

function editNames() {
	player1 = prompt("Give Player's 1 name");
	player2 = prompt("Give player's 2 name");

	document.querySelector("p.Player1").innerHTML = player1;		  
	document.querySelector("p.Player2").innerHTML = player2;
}

function initBoard(){
	var table = document.getElementById('mainTable');
	var tr = document.createElement('tr');

	for (var i = 8; i >=1; i--) {
	  var tr = document.createElement('tr');
	  for (var j = 9; j >=0; j--) {
		var td1 = document.createElement('td');
		var num=i*10-j;
		td1.innerHTML="<div id='position"+num+"'><img  src='images/"+num+".png'  height=70 width=70></div>";
		tr.appendChild(td1);
	  }
	  table.appendChild(tr);
	}
}

function changePosition(){
	var ladderPositions   =[5,16,21,37,42,54,60,67,73];
	var ladderNewPositions=[33,36,61,56,53,64,80,77,76];
	var snakePositions    =[13,20,28,44,58,59,65,72,78];
	var snakeNewPositions =[11,10,7,34,48,39,25,52,69];
	var cheat_positions   =[33,56,80];
	var python 			  =[29,46];

	getPlayerTurn();
	play();

	game.previous1 = game.position1;
	game.previous2 = game.position2;

	more_moves();
	
	if(game.position1 == game.position2) {
		document.getElementById("position"+game.position1).innerHTML="<img src='imagesBoth/"+game.position1+".png' height=70 width=70></div>";
	}
	else if(game.plays == "player1") {
		if(player1 == "tsitsipas") {
			game.position1 = cheat_positions[count1];
			document.getElementById("position"+game.position1).innerHTML="<img src='imagesRed/"+game.position1+".png' height=70 width=70></div>";
			count1++;
		}
		else {
			for(var i=0; i <=80 ; i++) {
				if(game.position1 == python[i]) {
					game.python_effect1 = true;
					document.getElementById('message').innerHTML+=" Player 1 has python effect | ";
				}

				if(game.position1 == ladderPositions[i]) {
					game.position1 = ladderNewPositions[i];
					document.getElementById("position"+game.position1).innerHTML="<img src='imagesRed/"+game.position1+".png' height=70 width=70></div>";		
				}
				else if(game.position1 == snakePositions[i] && game.python_effect1 == false){
					game.position1 = snakeNewPositions[i];
					document.getElementById("position"+game.position1).innerHTML="<img src='imagesRed/"+game.position1+".png' height=70 width=70></div>";		
				}
			}
			document.getElementById("position"+game.position1).innerHTML="<img src='imagesRed/"+game.position1+".png' height=70 width=70></div>";	
		}
	}
	else if(game.plays == "player2"){
		if(player2 == "tsitsipas") {
			game.position2 = cheat_positions[count1];
			document.getElementById("position"+game.position2).innerHTML="<img src='imagesRed/"+game.position2+".png' height=70 width=70></div>";
			count1++;
		}
		else {
			for(var i=0; i <=80 ; i++) {
				if(game.position2 == python[i]) {
					game.python_effect2 = true;
					document.getElementById('message').innerHTML+=" Player 2 has python effect | ";
				}

				if(game.position2==ladderPositions[i]) {
					game.position2 = ladderNewPositions[i];
					document.getElementById("position"+game.position2).innerHTML="<img src='imagesWhite/"+game.position2+".png' height=70 width=70></div>";		
				}
				else if(game.position2==snakePositions[i] && game.python_effect2 == false){
					game.position2 = snakeNewPositions[i];
					document.getElementById("position"+game.position2).innerHTML="<img src='imagesWhite/"+game.position2+".png' height=70 width=70></div>";		
				}
			}
			document.getElementById("position"+game.position2).innerHTML="<img src='imagesWhite/"+game.position2+".png' height=70 width=70></div>";
		}
	}
	
	if(game.position1 == game.position2) {
		document.getElementById("position"+game.position1).innerHTML="<img src='imagesBoth/"+game.position1+".png' height=70 width=70></div>";
	}

	changePlayerTurn();
	updateGUI_zari();
	if(play_with_computer == "Yes") {
		computer_playing();
	}
	hasPlayerWon();
}

/* Enas, allos tropos xwris eikones
Apo to 1 ews to 6
var x = Math.floor(Math.random()*6)+1;
Epistrefei timi sto zari
document.getElementById("zari").innerHTML = x;
*/

function zari_arithmoi(){
	if(player1 == "tsitsipas" && game.plays == "player1") {
		var timi = new Array("ImagesDice/five.png","ImagesDice/four.png","ImagesDice/four.png"); 
		document.getElementById("My_photo").src = timi[count2];
		count2++;
	}
	else if(player2 == "tsitsipas" && game.plays == "player2") {
		var timi = new Array("ImagesDice/five.png","ImagesDice/four.png","ImagesDice/four.png"); 
		document.getElementById("My_photo").src = timi[count2];
		count2++;
	}
	else {
		var timi = new Array("ImagesDice/one.png","ImagesDice/two.png","ImagesDice/three.png","ImagesDice/four.png","ImagesDice/five.png","ImagesDice/six.png");
		var randomNum = Math.floor(Math.random()*timi.length);
		document.getElementById("My_photo").src = timi[randomNum];
	}
}

function play(){
	var fullPath = document.getElementById("My_photo").src;
    var filename = fullPath.replace(/^.*[\\\/]/, 'ImagesDice/');
	document.getElementById("My_photo").value = filename;

	if(document.getElementById("My_photo").value == "ImagesDice/one.png") {
		if(game.plays=="player1") {
			game.arithmos_zariou = 1;
			game.position1+=1;
			document.getElementById('message').innerHTML+=" Dice's number "+game.arithmos_zariou+" |";
		}
		else{
			game.arithmos_zariou = 1;
			game.position2+=1;
			document.getElementById('message').innerHTML+=" Dice's number "+game.arithmos_zariou+" |";
		}
	}
	else if(document.getElementById("My_photo").value == "ImagesDice/two.png") {
		if(game.plays=="player1") {
			game.arithmos_zariou = 2;
			game.position1+=2;
			document.getElementById('message').innerHTML+=" Dice's number "+game.arithmos_zariou+" |";
		}
		else{
			game.arithmos_zariou = 2;
			game.position2+=2;
			document.getElementById('message').innerHTML+=" Dice's number "+game.arithmos_zariou+" |";
		}
	}
	else if(document.getElementById("My_photo").value == "ImagesDice/three.png") {
		if(game.plays=="player1") {
			game.arithmos_zariou = 3;
			game.position1+=3;
			document.getElementById('message').innerHTML+=" Dice's number "+game.arithmos_zariou+" |";
		}
		else{
			game.arithmos_zariou = 3;
			game.position2+=3;
			document.getElementById('message').innerHTML+=" Dice's number "+game.arithmos_zariou+" |";
		}
	}
	else if(document.getElementById("My_photo").value == "ImagesDice/four.png") {
		if(game.plays=="player1") {
			game.arithmos_zariou = 4;
			game.position1+=4;
			document.getElementById('message').innerHTML+=" Dice's number "+game.arithmos_zariou+" |";
		}
		else{
			game.arithmos_zariou = 4;
			game.position2+=4;
			document.getElementById('message').innerHTML+=" Dice's number "+game.arithmos_zariou+" |";
		}
	}
	else if(document.getElementById("My_photo").value == "ImagesDice/five.png") {
		if(game.plays=="player1") {
			game.arithmos_zariou = 5;
			game.position1+=5;
			document.getElementById('message').innerHTML+=" Dice's number "+game.arithmos_zariou+" |";
		}
		else{
			game.arithmos_zariou = 5;
			game.position2+=5;
			document.getElementById('message').innerHTML+=" Dice's number "+game.arithmos_zariou+" |";
		}
	}
	else {
		if(game.plays=="player1") {
			game.arithmos_zariou = 6;
			game.position1+=6;
			document.getElementById('message').innerHTML+=" Dice's number "+game.arithmos_zariou+" |";
		}
		else{
			game.arithmos_zariou = 6;
			game.position2+=6;
			document.getElementById('message').innerHTML+=" Dice's number "+game.arithmos_zariou+" |";
		}
	}
}

/*Dikia sinartisi gia omorfia tis selidas*/
function newGame(){
	alert("A New Game will start, good luck.");
	document.getElementById('button_move').disabled=false;
	game.arithmos_zariou = 0;
	game.plays = "player1";
	game.position1 = 0;
	game.position2 = 0;
	game.winner = false;
	game.previous1 = 0;
	game.previous2 = 0;
	game.python_effect1 = false;
	game.python_effect2 = false;
	player1 = "";
	player2 = "";
	play_with_computer = "";
	count1 = 0;
	count2 = 0;

	document.getElementById("My_photo").src = "ImagesDice/dice.gif";

	for(var i=1; i<=80; i++) {
		document.getElementById("position"+i).innerHTML="<img src='images/"+i+".png' height=70 width=70></div>";
	}
}

function getPlayerTurn() {
	if(game.plays == "player1") {
		document.getElementById('message').innerHTML+=" Player's 1 Turn: ";
	}
	else {
		game.plays="player2";
		document.getElementById('message').innerHTML+=" Player's 2 Turn: ";
	}
}

function changePlayerTurn() {
	if(game.plays == "player1" && document.getElementById("My_photo").value == "ImagesDice/six.png") {
		game.plays="player1";
	}
	else if(game.plays == "player2" && document.getElementById("My_photo").value == "ImagesDice/six.png") {
		game.plays="player2";
	}
	else if(game.plays == "player1" && document.getElementById("My_photo").value != "ImagesDice/six.png") {
		game.plays="player2";
	}
	else if(game.plays == "player2" && document.getElementById("My_photo").value != "ImagesDice/six.png") {
		game.plays="player1";
	}
}

function hasPlayerWon() {
	if(game.position1 == 80) {
		alert("Player 1 is Victorious !!!!");
		document.getElementById('message').innerHTML+=" Player 1 is Victorious !!!! |";
		game.winner = true;
	}
	else if(game.position2 == 80) {
		alert("Player 2 is Victorious !!!!");
		document.getElementById('message').innerHTML+=" Player 2 is Victorious !!!! |";
		game.winner = true;
	}

	if(game.winner == true) {
		document.getElementById('button_move').disabled=true;
	}
}

function updateGUI_innerHTML() {
	document.getElementById('message').innerHTML="";
	for(var i=1; i<=80; i++) {
		if(game.plays == "player1") {
			if(game.previous1 == i) {
				document.getElementById("position"+i).innerHTML="<img src='images/"+i+".png' height=70 width=70></div>";
			}
		}
		else if(game.plays == "player2"){
			if(game.previous2 == i) {
				document.getElementById("position"+i).innerHTML="<img src='images/"+i+".png' height=70 width=70></div>";
			}
		}
		else if(game.position1 == game.position2) {
			if(game.previous1 == i) {
				document.getElementById("position"+i).innerHTML="<img src='images/"+i+".png' height=70 width=70></div>";
			}
		}
	}
}
function updateGUI_zari() {
	document.getElementById("My_photo").src = "ImagesDice/dice.gif";
}

function more_moves() {
	if(game.position1 > 80 && game.plays == "player1") {
		if(game.position1 == 81 && document.getElementById("My_photo").value == "ImagesDice/six.png") {
			game.position1 = 79;
		}
		else if(game.position1 == 82 && document.getElementById("My_photo").value == "ImagesDice/six.png") {
			game.position1 = 78;
		}
		else if(game.position1 == 81 && document.getElementById("My_photo").value == "ImagesDice/five.png") {
			game.position1 = 79;
		}
		else if(game.position1 == 83 && document.getElementById("My_photo").value == "ImagesDice/six.png") {
			game.position1 = 77;
		}
		else if(game.position1 == 82 && document.getElementById("My_photo").value == "ImagesDice/five.png") {
			game.position1 = 78;
		}
		else if(game.position1 == 81 && document.getElementById("My_photo").value == "ImagesDice/four.png") {
			game.position1 = 79;
		}
		else if(game.position1 == 84 && document.getElementById("My_photo").value == "ImagesDice/six.png") {
			game.position1 = 76;
		}
		else if(game.position1 == 83 && document.getElementById("My_photo").value == "ImagesDice/five.png") {
			game.position1 = 77;
		}
		else if(game.position1 == 82 && document.getElementById("My_photo").value == "ImagesDice/four.png") {
			game.position1 = 78;
		}
		else if(game.position1 == 81 && document.getElementById("My_photo").value == "ImagesDice/three.png") {
			game.position1 = 79;
		}
		else if(game.position1 == 85 && document.getElementById("My_photo").value == "ImagesDice/six.png") {
			game.position1 = 75
		}
		else if(game.position1 == 84 && document.getElementById("My_photo").value == "ImagesDice/five.png") {
			game.position1 = 76
		}
		else if(game.position1 == 83 && document.getElementById("My_photo").value == "ImagesDice/four.png") {
			game.position1 = 77
		}
		else if(game.position1 == 82 && document.getElementById("My_photo").value == "ImagesDice/three.png") {
			game.position1 = 78
		}
		else if(game.position1 == 81 && document.getElementById("My_photo").value == "ImagesDice/two.png") {
			game.position1 = 79
		}
	}

	if(game.position2 > 80 && game.plays == "player2") {
		if(game.position2 == 81 && document.getElementById("My_photo").value == "ImagesDice/six.png") {
			game.position2 = 79;
		}
		else if(game.position2 == 82 && document.getElementById("My_photo").value == "ImagesDice/six.png") {
			game.position2 = 78;
		}
		else if(game.position2 == 81 && document.getElementById("My_photo").value == "ImagesDice/five.png") {
			game.position2 = 79;
		}
		else if(game.position2 == 83 && document.getElementById("My_photo").value == "ImagesDice/six.png") {
			game.position2 = 77;
		}
		else if(game.position2 == 82 && document.getElementById("My_photo").value == "ImagesDice/five.png") {
			game.position2 = 78;
		}
		else if(game.position2 == 81 && document.getElementById("My_photo").value == "ImagesDice/four.png") {
			game.position2 = 79;
		}
		else if(game.position2 == 84 && document.getElementById("My_photo").value == "ImagesDice/six.png") {
			game.position2 = 76;
		}
		else if(game.position2 == 83 && document.getElementById("My_photo").value == "ImagesDice/five.png") {
			game.position2 = 77;
		}
		else if(game.position2 == 82 && document.getElementById("My_photo").value == "ImagesDice/four.png") {
			game.position2 = 78;
		}
		else if(game.position2 == 81 && document.getElementById("My_photo").value == "ImagesDice/three.png") {
			game.position2 = 79;
		}
		else if(game.position2 == 85 && document.getElementById("My_photo").value == "ImagesDice/six.png") {
			game.position2 = 75
		}
		else if(game.position2 == 84 && document.getElementById("My_photo").value == "ImagesDice/five.png") {
			game.position2 = 76
		}
		else if(game.position2 == 83 && document.getElementById("My_photo").value == "ImagesDice/four.png") {
			game.position2 = 77
		}
		else if(game.position2 == 82 && document.getElementById("My_photo").value == "ImagesDice/three.png") {
			game.position2 = 78
		}
		else if(game.position2 == 81 && document.getElementById("My_photo").value == "ImagesDice/two.png") {
			game.position2 = 79
		}
	}
}
