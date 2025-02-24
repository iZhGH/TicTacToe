const Gameboard = (function () {
    let gameBoard = [];
  
    const initBoard = function () {
      gameBoard = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
    };
    
    const getBoardPosition =  function (row, column) {
        return gameBoard[row][column]
    }

    const displayBoard = function() {
        console.log(gameBoard);
    }
   
    const addPiece = function (position, userTurn) {
        let userPiece;
        if (userTurn == 1) {
            userPiece = Players.getPlayer1();
        }
        else {
            userPiece = Players.getPlayer2();
        }
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard.length; j++) {
                if(gameBoard[i][j] == position) {
                    gameBoard[i][j] = userPiece;
                }
            }
        }
        return
    };
  
    const resetBoard = function () {
        gameBoard = [[1,2,3],[4,5,6],[7,8,9]];
    };
  
  
    return { initBoard, addPiece, resetBoard, displayBoard, getBoardPosition};
  })();
  
  


  const GameController = (function () {
    let userTurn = 1;
    let userPosition;
    let maxTurns = 9;
    let winnerDetermined = false;

    const playGame = function () {
      
      
      for(let i =0; i < maxTurns; i++) {

      userPosition = prompt("Enter a number to place your X/O on that corresponding position.") // TODO: Check if valid number
      userPosition = Number(userPosition);
      
      Gameboard.addPiece(userPosition, userTurn);
      Gameboard.displayBoard();
      GameController.checkWinner(userTurn);
      if (winnerDetermined == true) {
        console.log(`Congratulations, Player ${userTurn} has won!`);
        i = 9;
    }
      (userTurn == 1) ? userTurn = 2 : userTurn = 1;
      }

    };
    
    const checkWinner = function (userTurn) {

        for (let row = 0; row <3; row++ ) { // Check rows for win condition
            if(checkMatch(Gameboard.getBoardPosition(row,0),Gameboard.getBoardPosition(row,1),Gameboard.getBoardPosition(row,2),userTurn)) {
                winnerDetermined = true;
            }
        }

        for (let column = 0; column <3; column++ ) { // Check columns for win condition
            if(checkMatch(Gameboard.getBoardPosition(0,column),Gameboard.getBoardPosition(1,column),Gameboard.getBoardPosition(2,column),userTurn)) {
                winnerDetermined = true;
            }
        }

        for (let row = 0; row < 1; row++ ) { // Check left-right diagonal for win condition
            if(checkMatch(Gameboard.getBoardPosition(0,0),Gameboard.getBoardPosition(1,1),Gameboard.getBoardPosition(2,2),userTurn)) {
                winnerDetermined = true;
                row++
            }
        }

        for (let row = 0; row < 1; row++ ) { // Check right-left diagonal for win condition
            if(checkMatch(Gameboard.getBoardPosition(0,2),Gameboard.getBoardPosition(1,1),Gameboard.getBoardPosition(2,0),userTurn)) {
                winnerDetermined = true;
                row++
            }
        }

        
    }

    const checkMatch = function (one,two,three,turn) {
        let userPieceAgain;

        if (turn == 1) {
            userPieceAgain = Players.getPlayer1();
        }
        else {
            userPieceAgain = Players.getPlayer2();
        }
        if ((one == userPieceAgain) && (two == userPieceAgain) && (three == userPieceAgain)) {
            return true
        }
        else {
            return false
        }
    }
  
  
    const checkTurn = function () {
      if (userTurn == 1) {
        return "Player 1's turn (X's)!";
      }
      else {
        return "Player 2's turn (O's)!"
      }
    };
  
  
    return { playGame, checkWinner};
  })();


  
  
  const Players = (function () {
    let Player1 = { piece: "X" };
    let Player2 = { piece: "O" };
    
    const getPlayer1 = () => Player1.piece;
    const getPlayer2 = () => Player2.piece;
    
    return { getPlayer1, getPlayer2 };
  })();
  
  
  Gameboard.initBoard();
  GameController.playGame();
  
  
  
  
  
  