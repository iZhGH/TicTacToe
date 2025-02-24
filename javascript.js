const messageBoard = document.querySelector(".gameMessage");
const gridPosition = document.querySelectorAll(".gridSpot");








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
        
        position.textContent = userPiece;
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
        messageBoard.textContent = `It's Player ${userTurn}'s Turn!`;
        gridPosition.forEach((position) => position.addEventListener("click", () => {
            if ((event.target.textContent !== "X") && (event.target.textContent !== "O")) {
                let spotChosen = event.target;
                Gameboard.addPiece(spotChosen,userTurn);
                GameController.checkWinner(userTurn);
                if (winnerDetermined == true) {
                console.log(`Congratulations, Player ${userTurn} has won!`);
                i = 9;
                }
                (userTurn == 1) ? userTurn = 2 : userTurn = 1;
                messageBoard.textContent = `It's Player ${userTurn}'s Turn!`;

            }
         else {
            messageBoard.textContent = "Please select an empty spot!";
         }
        

        }));
    };
    
    const checkWinner = function (userTurn) {



       
        
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
  
  
  // Gameboard.initBoard();
GameController.playGame();
  
  
  
  
  
  