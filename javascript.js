const Gameboard = (function () {
    let gameBoard = [];
  
    const initBoard = function () {
      gameBoard = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
    };
    
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
  
  
    return { initBoard, addPiece, resetBoard, displayBoard };
  })();
  
  


  const GameController = (function () {
    let userTurn = 1;
    let userPosition;
    let maxTurns = 9;
    let winnerDetermined;

    const playGame = function () {
      
      
      for(let i =0; i < maxTurns; i++) {
      userPosition = prompt("Enter a number to place your X/O on that corresponding position.") // TODO: Check if valid number
      userPosition = Number(userPosition);
      
      Gameboard.addPiece(userPosition, userTurn);
      Gameboard.displayBoard();
      GameController.checkWinner();
      (userTurn == 1) ? userTurn = 2 : userTurn = 1;
      }

    };
    
    const checkWinner = function () {
        winnerDetermined = false;
        
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
  Gameboard.displayBoard();
  GameController.playGame();
  
  
  
  
  
  