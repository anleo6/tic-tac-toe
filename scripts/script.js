$(document).ready(function() {
	
	var signPlayer, signComputer, count, color;
	var anyCell = $(document).find(".col-xs-4");
	var cells = [];
	var win = false;
	var checkEvent = false;
	
	// Creating array from cells
	function obtainCells() {
		cells[0] = 0;
		for (var i = 1; i < 10; i++) {
			cells[i] = $("#sign_" + i);
		}
	}
	
	// Choice of Sign and Start Game
	function start() {
		obtainCells();
		$("#message").html("Would you like to play<p><span id='x'>X</span> or <span id='o'>O</span> ?</p>");
		
		$("#x").click(function() {
			signPlayer = "X";
			signComputer = "O";
			checkEvent = true;
			playerTurn();
		});
	
		$("#o").click(function() {
			signPlayer = "O";
			signComputer = "X";
			$("#message").html("Computer goes!");
			computerTurn();
		});
	}
	
	// Stop of Game and Start of New Game
	function stopGame() {
		checkEvent = false;
		win = false;
		
		// clear all cells
		anyCell.each(function () {
      	$(this).empty().removeClass("animated flash");
   	});
		
		// start of new game
		start();
	}
	
	// Player's Turn
	function playerTurn() {
		// set color of sign
		if (signPlayer === 'X') color = "#17e482";
		else color = "#e0c225";
		
		// check of empty cells
		count = 0;
		anyCell.each(function () {
      	if ( $(this).html() === "" ) count++;
   	}); 
		
		// if empty cells exist the player can go
		if (count) {
			$("#message").html("Go!");
			// Player turns by click on empty cell
			anyCell.click(function () {
     	 		if ( $(this).html() === "" && checkEvent ) {
					$(this).html(signPlayer).css("color", color);
					checkEvent = false;
					if (count !== 1) $("#message").html("Computer goes!");
					setTimeout(computerTurn, 1000);
				}
   		});
		}
	}
	
	// AI of Computer
	function computerTurn() {
		// set color of signs
		if (signComputer === 'X') color = "#17e482";
		else color = "#e0c225";
		
		// check opportunity of win
		if (cells[1].html() === signComputer && cells[2].html() === signComputer && cells[3].html() === "")
			lastTurn(3, 1, 2);
		else if (cells[1].html() === signComputer && cells[3].html() === signComputer && cells[2].html() === "")
			lastTurn(2, 1, 3);
		else if (cells[1].html() === signComputer && cells[4].html() === signComputer && cells[7].html() === "")
			lastTurn(7, 1, 4);
		else if (cells[1].html() === signComputer && cells[7].html() === signComputer && cells[4].html() === "")
			lastTurn(4, 1, 7);
		else if (cells[1].html() === signComputer && cells[5].html() === signComputer && cells[9].html() === "")
			lastTurn(9, 1, 5);
		else if (cells[1].html() === signComputer && cells[9].html() === signComputer && cells[5].html() === "")
			lastTurn(5, 1, 9);
		
		else if (cells[2].html() === signComputer && cells[3].html() === signComputer && cells[1].html() === "")
			lastTurn(1, 2, 3);
		else if (cells[2].html() === signComputer && cells[5].html() === signComputer && cells[8].html() === "")
			lastTurn(8, 2, 5);
		else if (cells[2].html() === signComputer && cells[8].html() === signComputer && cells[5].html() === "")
			lastTurn(5, 2, 8);
		
		else if (cells[3].html() === signComputer && cells[6].html() === signComputer && cells[9].html() === "")
			lastTurn(9, 3, 6);
		else if (cells[3].html() === signComputer && cells[5].html() === signComputer && cells[7].html() === "")
			lastTurn(7, 3, 5);
		else if (cells[3].html() === signComputer && cells[7].html() === signComputer && cells[5].html() === "")
			lastTurn(5, 3, 7);
		else if (cells[3].html() === signComputer && cells[9].html() === signComputer && cells[6].html() === "")
			lastTurn(6, 3, 9);
		
		else if (cells[4].html() === signComputer && cells[5].html() === signComputer && cells[6].html() === "") 
			lastTurn(6, 4, 5);
		else if (cells[4].html() === signComputer && cells[6].html() === signComputer && cells[5].html() === "")
			lastTurn(5, 4, 6);
		else if (cells[4].html() === signComputer && cells[7].html() === signComputer && cells[1].html() === "")
			lastTurn(1, 4, 7);
		
		else if (cells[5].html() === signComputer && cells[9].html() === signComputer && cells[1].html() === "")
			lastTurn(1, 5, 9);
		else if (cells[5].html() === signComputer && cells[8].html() === signComputer && cells[2].html() === "")
			lastTurn(2, 5, 8);
		else if (cells[5].html() === signComputer && cells[6].html() === signComputer && cells[4].html() === "")
			lastTurn(4, 5, 6);
	
		else if (cells[6].html() === signComputer && cells[9].html() === signComputer && cells[3].html() === "")
			lastTurn(3, 6, 9);
			
		else if (cells[7].html() === signComputer && cells[8].html() === signComputer && cells[9].html() === "")
			lastTurn(9, 7, 8);
		else if (cells[7].html() === signComputer && cells[9].html() === signComputer && cells[8].html() === "")
			lastTurn(8, 7, 9);
		else if (cells[7].html() === signComputer && cells[5].html() === signComputer && cells[3].html() === "")
			lastTurn(3, 7, 5);
	
		else if (cells[8].html() === signComputer && cells[9].html() === signComputer && cells[7].html() === "")
			lastTurn(7, 8, 9);
		
		// if player can win...
		else if (cells[1].html() === signPlayer && cells[2].html() === signPlayer && cells[3].html() === "")
			cells[3].html(signComputer).css("color", color);
		else if (cells[1].html() === signPlayer && cells[3].html() === signPlayer && cells[2].html() === "")
			cells[2].html(signComputer).css("color", color);
		else if (cells[1].html() === signPlayer && cells[4].html() === signPlayer && cells[7].html() === "")
			cells[7].html(signComputer).css("color", color);
		else if (cells[1].html() === signPlayer && cells[7].html() === signPlayer && cells[4].html() === "")
			cells[4].html(signComputer).css("color", color);
		else if (cells[1].html() === signPlayer && cells[5].html() === signPlayer && cells[9].html() === "")
			cells[9].html(signComputer).css("color", color);
		else if (cells[1].html() === signPlayer && cells[9].html() === signPlayer && cells[5].html() === "")
			cells[5].html(signComputer).css("color", color);
		
		else if (cells[2].html() === signPlayer && cells[3].html() === signPlayer && cells[1].html() === "")
			cells[1].html(signComputer).css("color", color);
		else if (cells[2].html() === signPlayer && cells[5].html() === signPlayer && cells[8].html() === "")
			cells[8].html(signComputer).css("color", color);
		else if (cells[2].html() === signPlayer && cells[8].html() === signPlayer && cells[5].html() === "")
			cells[5].html(signComputer).css("color", color);
		
		else if (cells[3].html() === signPlayer && cells[6].html() === signPlayer && cells[9].html() === "")
			cells[9].html(signComputer).css("color", color);
		else if (cells[3].html() === signPlayer && cells[5].html() === signPlayer && cells[7].html() === "")
			cells[7].html(signComputer).css("color", color);
		else if (cells[3].html() === signPlayer && cells[7].html() === signPlayer && cells[5].html() === "")
			cells[5].html(signComputer).css("color", color);
		else if (cells[3].html() === signPlayer && cells[9].html() === signPlayer && cells[6].html() === "")
			cells[6].html(signComputer).css("color", color);
		
		else if (cells[4].html() === signPlayer && cells[5].html() === signPlayer && cells[6].html() === "") 
			cells[6].html(signComputer).css("color", color);
		else if (cells[4].html() === signPlayer && cells[6].html() === signPlayer && cells[5].html() === "")
			cells[5].html(signComputer).css("color", color);
		else if (cells[4].html() === signPlayer && cells[7].html() === signPlayer && cells[1].html() === "")
			cells[1].html(signComputer).css("color", color);
		
		else if (cells[5].html() === signPlayer && cells[9].html() === signPlayer && cells[1].html() === "")
			cells[1].html(signComputer).css("color", color);
		else if (cells[5].html() === signPlayer && cells[8].html() === signPlayer && cells[2].html() === "")
			cells[2].html(signComputer).css("color", color);
		else if (cells[5].html() === signPlayer && cells[6].html() === signPlayer && cells[4].html() === "")
			cells[4].html(signComputer).css("color", color);
	
		else if (cells[6].html() === signPlayer && cells[9].html() === signPlayer && cells[3].html() === "")
			cells[3].html(signComputer).css("color", color);
			
		else if (cells[7].html() === signPlayer && cells[8].html() === signPlayer && cells[9].html() === "")
			cells[9].html(signComputer).css("color", color);
		else if (cells[7].html() === signPlayer && cells[9].html() === signPlayer && cells[8].html() === "")
			cells[8].html(signComputer).css("color", color);
		else if (cells[7].html() === signPlayer && cells[5].html() === signPlayer && cells[3].html() === "")
			cells[3].html(signComputer).css("color", color);
	
		else if (cells[8].html() === signPlayer && cells[9].html() === signPlayer && cells[7].html() === "")
			cells[7].html(signComputer).css("color", color);
		
		// otherwise
		else {
			     if (cells[5].html() === "") cells[5].html(signComputer).css("color", color);
			else if (cells[1].html() === "") cells[1].html(signComputer).css("color", color);
			else if (cells[3].html() === "") cells[3].html(signComputer).css("color", color);
			else if (cells[7].html() === "") cells[7].html(signComputer).css("color", color);
			else if (cells[9].html() === "") cells[9].html(signComputer).css("color", color);
			else if (cells[2].html() === "") cells[2].html(signComputer).css("color", color);
			else if (cells[4].html() === "") cells[4].html(signComputer).css("color", color);
			else if (cells[6].html() === "") cells[6].html(signComputer).css("color", color);
			else if (cells[8].html() === "") cells[8].html(signComputer).css("color", color);
		}
		
		if (!win) {
			count = 0;
			anyCell.each(function () {
      		if ( $(this).html() === "" ) count++;
   		}); 
		
			if (count) {
				checkEvent = true;
				playerTurn();
			} else {
				$("#message").html("Nobody wins... Tie!");
				setTimeout(stopGame, 2000);
			}
		}
	}
	
	// Win of Computer
	function lastTurn(n, f, s) {
		win = true;
		cells[n].html(signComputer).css("color", color).addClass("animated flash");
		cells[f].addClass("animated flash");
		cells[s].addClass("animated flash");
		$("#message").html("You lost...");
		setTimeout(stopGame, 2000);
	}
	
	// Start
	start();	
});

