// DOM GRABBING

const messageBoard = document.querySelector(".gameMessage");
const gridPosition = document.querySelectorAll(".gridSpot");

const positionOne = document.querySelector(".one");
const positionTwo = document.querySelector(".two");
const positionThree = document.querySelector(".three");
const positionFour = document.querySelector(".four");
const positionFive = document.querySelector(".five");
const positionSix = document.querySelector(".six");
const positionSeven = document.querySelector(".seven");
const positionEight = document.querySelector(".eight");
const positionNine = document.querySelector(".nine");


// MODULE PATTERN 
const Gameboard = (function () {
  
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
  

  
    return {addPiece};
  })();
  
  

  const GameController = (function () {
    let userTurn = 1;
    let turns = 1;
    let winnerDetermined = false;

    const playGame = function () {

        messageBoard.textContent = `It's Player ${userTurn}'s Turn!`;

        gridPosition.forEach((position) => position.addEventListener("click", function place(event) {
            let spotChosen = event.target;
            if (turns == 9) { // Max possible turns before board is full
                gridPosition.forEach((position) => position.removeEventListener('click', place));
                messageBoard.textContent = `Game has tied!`;
                return
            }

            if (winnerDetermined) {
                messageBoard.textContent = `Congratulations, Player ${userTurn} has won!`
                return
            }
            messageBoard.textContent = `It's Player ${userTurn}'s Turn!`;
            if ((event.target.textContent !== "X") && (event.target.textContent !== "O")) { // If grid spot is already taken
                Gameboard.addPiece(spotChosen,userTurn);
                GameController.checkWinner(userTurn);
                (userTurn == 1) ? userTurn = 2 : userTurn = 1;
                messageBoard.textContent = `It's Player ${userTurn}'s Turn!`;
                turns++;
            }
         else {
            messageBoard.textContent = "Please select an empty spot!";
         }
        

        }));
    };
    
    const checkWinner = function (userTurn) {
        let rows = [
            [positionOne.textContent,positionTwo.textContent,positionThree.textContent],
            [positionFour.textContent,positionFive.textContent,positionSix.textContent],
            [positionSeven.textContent,positionEight.textContent,positionNine.textContent]
        ]
        
        let columns = [
            [positionOne.textContent,positionFour.textContent,positionSeven.textContent],
            [positionTwo.textContent,positionFive.textContent,positionEight.textContent],
            [positionThree.textContent,positionSix.textContent,positionNine.textContent]
        ]

        let diagonals = [
            [positionOne.textContent,positionFive.textContent,positionNine.textContent],
            [positionThree.textContent,positionFive.textContent,positionSeven.textContent]
        ]

        for (let row of rows) {
            if(row[0] !== "" && row[0] == row[1] && row[1] == row[2]) {
                winnerDetermined = true;
                messageBoard.textContent = `Congratulations, Player ${userTurn} has won!`;
            gridPosition.forEach((position) => position.removeEventListener('click', place));
                return 
            }
        }

        // Check each row/column/diagonal for all 3 pieces

        for (let column of columns) {
            if(column[0] !== "" && column[0] == column[1] && column[1] == column[2]) {
                winnerDetermined = true;
                messageBoard.textContent = `Congratulations, Player ${userTurn} has won!`;
            gridPosition.forEach((position) => position.removeEventListener('click', place));
                return 
            }
        }

        for (let diagonal of diagonals) {
            if(diagonal[0] !== "" && diagonal[0] == diagonal[1] && diagonal[1] == diagonal[2]) {
                winnerDetermined = true;
                messageBoard.textContent = `Congratulations, Player ${userTurn} has won!`;
            gridPosition.forEach((position) => position.removeEventListener('click', place));
                return 
            }
        }
        
       
    }


  
    return { playGame, checkWinner};
  })();

  
  const Players = (function () {
    let Player1 = { piece: "X" };
    let Player2 = { piece: "O" };
    
    const getPlayer1 = () => Player1.piece;
    const getPlayer2 = () => Player2.piece;
    
    return { getPlayer1, getPlayer2 };
  })();
  

  
  // Main
  GameController.playGame();
  
  
  