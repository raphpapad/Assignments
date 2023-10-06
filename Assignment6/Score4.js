"use strict"
/*Initialize the variables.*/
const game = {
    // Player 1 plays first.
    plays: "player1",
    // Player's move.
    moves1: 0, 
    moves2: 0, 
    // All cells are empty.
    cells: [],
    count_draw: 0,
    countvicories1: 0,
    countvicories2: 0,
    // No victor yet.
    winner: false,
	BoolStart: false,
	CounterForStart: 0
};

/*Reset the below elemnts acording to const game.*/
function newGame() {
    game.moves1 = 0;
	game.moves2 = 0;
	
	game.cells[0]=[null,null,null,null,null,null,null];
	game.cells[1]=[null,null,null,null,null,null,null];
	game.cells[2]=[null,null,null,null,null,null,null];
	game.cells[3]=[null,null,null,null,null,null,null];
	game.cells[4]=[null,null,null,null,null,null,null];
	game.cells[5]=[null,null,null,null,null,null,null];	

	game.winner = false; 
	game.BoolStart = false;
	game.CounterForStart = 0;
}

/*Player's moves.*/
function play(x,y) { 
	for(let i=0; i<5; i++) {
		for(let j=0; j<7; j++) {
			if(game.CounterForStart==0 && (x==i || y==j)) {
				game.BoolStart = true;
			}
		}
	}

	// At Connect 4 you start to insert 
	if(game.BoolStart == true) {
		DisableFirstFiveRows();

		/*At the beginning all cells are empty.*/
		game.cells[0]=[null,null,null,null,null,null,null];
		game.cells[1]=[null,null,null,null,null,null,null];
		game.cells[2]=[null,null,null,null,null,null,null];
		game.cells[3]=[null,null,null,null,null,null,null];
		game.cells[4]=[null,null,null,null,null,null,null];
		game.cells[5]=[null,null,null,null,null,null,null];

		game.BoolStart = false;
		game.CounterForStart = 1;
	}
	else {
		validMove(x,y);

		// We enable the above button of the disabled one.
		if(x != 0) {
			document.getElementById('p'+(x-1)+'_'+y).disabled=false; 
		}

		// Reset infobox.
		if(game.moves1 == 19 || game.moves2 == 19) {		
			document.getElementById('message').innerHTML="";
		}

		// Checks if the current player is the winner.
		hasPlayerWon(x,y);
		if(game.winner == false) { 
			changePlayerTurn();
		}
	}	
}

/*Checks if the move is valid.*/
function validMove(x,y) {
	if(game.plays == "player1") {
		// If player 1 plays then paint the cycle red.
		document.getElementById('p'+x+'_'+y).style.backgroundColor='red';
		game.moves1++;        
		// Information for the info box.
		document.getElementById('message').innerHTML+="Moves: "+ game.moves1+ " | Player = " + game.plays+" | Player's 1 Victories: "+ game.countvicories1+" | Draws: "+ game.count_draw+"<br>";
	}
    else {
		// If player 2 plays then paint the cycle yellow.
		document.getElementById('p'+x+'_'+y).style.backgroundColor='yellow';
		game.moves2++;
		document.getElementById('message').innerHTML+="Moves: "+ game.moves2+" | Player = "+game.plays+" | Player's 2 Victories: "+game.countvicories2+" | Draws: "+ game.count_draw+"<br>"; 
    }
    // Cells that each player has.
    game.cells[x][y]=game.plays;
	// Since we used the cell we disable it.
	document.getElementById('p'+x+'_'+y).disabled=true;
}

/*Player's turn.*/
function changePlayerTurn() {
	if(game.plays =="player1") {
		game.plays="player2";
	}
	else {
		game.plays="player1";
    }
}

/*Check if there is a winner.*/
function hasPlayerWon(x,y) {
    if((game.moves1>=4 || game.moves2>=4) && (horizontalWin()==true || verticalWin()==true || diagonialWin1()==true || diagonialWin2()==true)) {
		game.winner=true;
		disableButtons();
	}
	else{
		isDraw();
	}
}

function filterFunc(value){
	return value===game.plays;
}

/*Horizontal win.*/
function horizontalWin() {
	// Way1 (I have to put as parameter, the variable x)
    /*if((game.cells[x].filter(filterFunc).length===4) != null){
		if(game.plays == "player1") {
			game.countvicories1++;
		}
		else {
			game.countvicories2++;
		}
		document.getElementById('message').innerHTML+="● Horizontal Victory for "+game.plays+".";
		return true;
	}*/
	
	// Way2
	for(let i=0; i<6; i++) {
    	for(let j=0; j<4; j++) {
			if(game.cells[i][j] != null) {
				if((game.cells[i][j] == game.cells[i][j+1]) && (game.cells[i][j] == game.cells[i][j+2]) && (game.cells[i][j] == game.cells[i][j+3])) {
					if(game.plays == "player1") {
						game.countvicories1++;
					}
					else {
						game.countvicories2++;
					}
					document.getElementById('message').innerHTML+="● Horizontal Victory for "+game.plays+".";
					return true;
				}
			}
		}
	}
	return false;
}

/*Vertical win.*/
function verticalWin() {
	// Way1 (I have to put as parameter, the variable y)
    /*const temp = [game.cells[0][y],game.cells[1][y],game.cells[2][y],game.cells[3][y],game.cells[4][y],game.cells[5][y]];	
	if((temp.filter(filterFunc).length===4) != null){
		console.log(temp.filter(filterFunc));
		if(game.plays == "player1") {
			game.countvicories1++;
		}
		else {
			game.countvicories2++;
		}	
		document.getElementById('message').innerHTML+="● Vertical Victory for "+game.plays+".";
		return true;
	}*/

	// Way2
	for(let i=0; i<3; i++) {
    	for(let j=0; j<7; j++) {
			if(game.cells[i][j] != null) {
				if((game.cells[i][j] == game.cells[i+1][j]) && (game.cells[i][j] == game.cells[i+2][j]) && (game.cells[i][j] == game.cells[i+3][j])) {
                	if(game.plays == "player1") {
						game.countvicories1++;
					}
					else {
						game.countvicories2++;
					}
					document.getElementById('message').innerHTML+="● Vertical Victory for "+game.plays+".";
					return true;
				}
			}
		}
	}
	return false;
}

/*Diagonial win (bottom-right to top-left).*/
function diagonialWin1() {
	/*if(game.plays == "player1") {
		game.countvicories1++;
	}
	else {
		game.countvicories2++;
	}

	// Way1
	if((game.cells[0][3] == game.cells[1][2]) && (game.cells[0][3] == game.cells[2][1]) && (game.cells[0][3] == game.cells[3][0])) {
		document.getElementById('message').innerHTML+="● Diagonial Victory (bottom-right to top-left) for "+game.plays+".";
		return true;
	}
	else if(((game.cells[0][4] == game.cells[1][3]) && (game.cells[0][4] == game.cells[2][2]) && (game.cells[0][4] == game.cells[3][1])) || ((game.cells[1][3] == game.cells[2][2]) && (game.cells[1][3] == game.cells[3][1]) && (game.cells[1][3] == game.cells[4][0]))) {
		document.getElementById('message').innerHTML+="● Diagonial Victory (bottom-right to top-left) for "+game.plays+".";
		return true;
	}
	else if(((game.cells[0][5] == game.cells[1][4]) && (game.cells[0][5] == game.cells[2][3]) && (game.cells[0][5] == game.cells[3][2])) || ((game.cells[1][4] == game.cells[2][3]) && (game.cells[1][4] == game.cells[3][2]) && (game.cells[1][4] == game.cells[4][1]))  || ((game.cells[2][3] == game.cells[3][2]) && (game.cells[2][3] == game.cells[4][1]) && (game.cells[2][3] == game.cells[5][0]))) {
		document.getElementById('message').innerHTML+="● Diagonial Victory (bottom-right to top-left) for "+game.plays+".";
		return true;
	}
	else if(((game.cells[0][6] == game.cells[1][5]) && (game.cells[0][6] == game.cells[2][4]) && (game.cells[0][6] == game.cells[3][3])) || ((game.cells[1][5] == game.cells[2][4]) && (game.cells[1][5] == game.cells[3][3]) && (game.cells[1][5] == game.cells[4][2]))  || ((game.cells[2][4] == game.cells[3][3]) && (game.cells[2][4] == game.cells[4][2]) && (game.cells[2][4] == game.cells[5][1]))) {
		document.getElementById('message').innerHTML+="● Diagonial Victory (bottom-right to top-left) for "+game.plays+".";
		return true;
	}
	else if(((game.cells[1][6] == game.cells[2][5]) && (game.cells[1][6] == game.cells[3][4]) && (game.cells[1][6] == game.cells[4][5])) || ((game.cells[2][5] == game.cells[3][4]) && (game.cells[2][5] == game.cells[4][5]) && (game.cells[2][5] == game.cells[5][6]))) {
		document.getElementById('message').innerHTML+="● Diagonial Victory (bottom-right to top-left) for "+game.plays+".";
		return true;
	}
	else if((game.cells[2][6] == game.cells[3][5]) && (game.cells[2][6] == game.cells[4][4]) && (game.cells[2][6] == game.cells[5][3])) {
		document.getElementById('message').innerHTML+="● Diagonial Victory (bottom-right to top-left) for "+game.plays+".";
		return true;
	}*/

	// Way2
	for (let i=0; i<3; i++) {
        for (let j=0; j<4; j++) {
			if(game.cells[i][j] != null) {
				if ((game.cells[i][j] == game.cells[i+1][j+1]) && (game.cells[i][j] == game.cells[i+2][j+2]) && (game.cells[i][j] == game.cells[i+3][j+3])) {
                	if(game.plays == "player1") {
						game.countvicories1++;
					}
					else {
						game.countvicories2++;
					}
					document.getElementById('message').innerHTML+="● Diagonial Victory (bottom-right to top-left) for "+game.plays+".";
					return true;
				}
			}
		}
	}
	return false;
}

/*Diagonial win (bottom-left to top-right).*/
function diagonialWin2() {
	/*if(game.plays == "player1") {
		game.countvicories1++;
	}
	else {
		game.countvicories2++;
	}

	// Way1
	if(((game.cells[0][3] == game.cells[1][4]) && (game.cells[0][3] == game.cells[2][5]) && (game.cells[0][3] == game.cells[3][6]))) {
		document.getElementById('message').innerHTML+="● Diagonial Victory (bottom-left to top-right) for "+game.plays+".";
		return true;
	}
	else if(((game.cells[0][2] == game.cells[1][3]) && (game.cells[0][2] == game.cells[2][4]) && (game.cells[0][2] == game.cells[3][5])) || ((game.cells[1][3] == game.cells[2][4]) && (game.cells[1][3] == game.cells[3][5]) && (game.cells[1][3] == game.cells[4][6]))) {
		document.getElementById('message').innerHTML+="● Diagonial Victory (bottom-left to top-right) for "+game.plays+".";
		return true;
	}
	else if(((game.cells[0][1] == game.cells[1][2]) && (game.cells[0][1] == game.cells[2][3]) && (game.cells[0][1] == game.cells[3][4])) || ((game.cells[1][2] == game.cells[2][3]) && (game.cells[1][2] == game.cells[3][4]) && (game.cells[1][2] == game.cells[4][5]))  || ((game.cells[2][3] == game.cells[3][4]) && (game.cells[2][3] == game.cells[4][5]) && (game.cells[2][3] == game.cells[5][6]))) {
		document.getElementById('message').innerHTML+="● Diagonial Victory (bottom-left to top-right) for "+game.plays+".";
		return true;
	}
	else if(((game.cells[0][0] == game.cells[1][1]) && (game.cells[0][0] == game.cells[2][2]) && (game.cells[0][0] == game.cells[3][3])) || ((game.cells[1][1] == game.cells[2][2]) && (game.cells[1][1] == game.cells[3][3]) && (game.cells[1][1] == game.cells[4][4]))  || ((game.cells[2][2] == game.cells[3][3]) && (game.cells[2][2] == game.cells[4][4]) && (game.cells[2][2] == game.cells[5][5]))) {
		document.getElementById('message').innerHTML+="● Diagonial Victory (bottom-left to top-right) for "+game.plays+".";
		return true;
	}
	else if(((game.cells[1][0] == game.cells[2][1]) && (game.cells[1][0] == game.cells[3][2]) && (game.cells[1][0] == game.cells[4][3])) || ((game.cells[2][1] == game.cells[3][2]) && (game.cells[2][1] == game.cells[4][3]) && (game.cells[2][1] == game.cells[5][4]))) {
		document.getElementById('message').innerHTML+="● Diagonial Victory (bottom-left to top-right) for "+game.plays+".";
		return true;
	}
	else if((game.cells[2][0] == game.cells[3][1]) && (game.cells[2][0] == game.cells[4][2]) && (game.cells[2][0] == game.cells[5][3])) {
		document.getElementById('message').innerHTML+="● Diagonial Victory (bottom-left to top-right) for "+game.plays+".";
		return true;
	}*/

	// Way2
	for (let i=3; i<6; i++) {
        for (let j=0; j<4; j++) {
			if(game.cells[i][j] != null) {
            	if ((game.cells[i][j] == game.cells[i-1][j+1]) && (game.cells[i][j] == game.cells[i-2][j+2]) && (game.cells[i][j] == game.cells[i-3][j+3])) {
					if(game.plays == "player1") {
						game.countvicories1++;
					}
					else {
						game.countvicories2++;
					}
					document.getElementById('message').innerHTML+="● Diagonial Victory (bottom-left to top-right) for "+game.plays+".";
					return true;
				}				
			}
		}
	}
	return false;
}

/*Draw*/
function isDraw() {
    if(game.moves1 == 42 || game.moves2 == 42){
		game.count_draw++;
		document.getElementById('message').innerHTML+="● Draw."; 
	}
}

/*Disable tiles when there is a winner.*/
function disableButtons() { 
	for(var i=0; i<6; i++){
		for(var j=0; j<7; j++){
			document.getElementById('p'+i+'_'+j).disabled=true;
		}
	}
}

/*Start a new game.*/
function NewGameAnytime() {
	/*Because we start a new game we enable all tiles.*/
	for(var i=0; i<6; i++){
		for(var j=0; j<7; j++){
			document.getElementById('p'+i+'_'+j).disabled=false;
			document.getElementById('p'+i+'_'+j).style.backgroundColor='Navy';
		}
	}	

	/*Remove the previous contents from the info box.*/
	let divElement = document.getElementById("message");
	while (divElement.firstChild) {
		divElement.removeChild(divElement.firstChild);
	}

	DisableFirstFiveRows();
	newGame();
}

/*In Conect 4 you start from the bottom and then you go upwords. You can't choose the above 
tile if the below isn't choosen by a player. So we disable the first 5 rows.*/
function DisableFirstFiveRows() {
	for(var i=0; i<5; i++) {
		for(var j=0; j<7; j++) {
			document.getElementById('p'+i+'_'+j).disabled=true;
		}		
	}
}
