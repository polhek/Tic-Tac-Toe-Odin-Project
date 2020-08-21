// player factory...
const playerFactory = () => {
    const playTurn = (event, currentPlayer) => {
      const id = boardObject.cells.indexOf(event.target);
      boardObject.boardArray[id] = currentPlayer;
      boardObject.render();
    };
  
    return {
      playTurn
    };
  };





// Gameboard object...
const boardObject = (() => {
    let boardArray = ['', '', '', '', '', '', '', '', ''];

  const cells = Array.from(document.querySelectorAll(".cell"));
  // displays the content of the boardArray...
  const render = () => {
    boardArray.forEach((mark, idx) => {
      cells[idx].textContent = boardArray[idx];
    });
  };

  return {
    boardArray,
    render,
    cells
  };
})();





// Display controller ...
const displayController = (() => {
    const player = playerFactory();
    const playerOne = 'X';
    const playerTwo = 'O'
    const gameBoard = document.querySelector(".game_board");
    let currentPlayer = playerOne;
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }
  
    gameBoard.addEventListener("click", (event) => {
      if (event.target.classList.contains("cell")) {
        if (event.target.textContent === "") {
          event.target.textContent = currentPlayer;
          switchPlayer();
          //   const id = boardObject.cells.indexOf(event.target);
          //   boardObject.boardArray[id] = currentPlayer;
          //   boardObject.render();
  
          ////////
          player.playTurn(event, currentPlayer);
        }
      }
    });
  })();


