// player factory...
const playerFactory = (name, mark) => {
  const playTurn = (event, currentPlayer) => {
    const id = boardObject.cells.indexOf(event.target);
    
    let newArray = boardObject.getBoard();
    newArray[id] = currentPlayer;
    boardObject.setBoard(newArray);
    boardObject.render();

  };

  return {
    playTurn,
    name,
    mark,
  };
};

// Gameboard object...
const boardObject = (() => {
  let boardArray = ["", "", "", "", "", "", "", "", ""];

  const cells = Array.from(document.querySelectorAll(".cell"));
  // displays the content of the boardArray...
  const render = () => {
    boardArray.forEach((mark, idx) => {
      cells[idx].textContent = boardArray[idx];
    });
  };

  const getBoard = () => {
    return boardArray;
  };

  const setBoard = (newArray) => {
    boardArray = newArray;
  }

  const checkWin = (currentPlayer) => {
    const winArraysCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winArraysCombinations.some((combination) => {
      return combination.every((index) => {
        return boardArray[index].includes(currentPlayer.mark);
      });
    });
  };

  const isDraw = (playerOne, playerTwo) => {
    return boardArray.every((cell) => {
      return cell.includes(playerOne) || cell.includes(playerTwo);
    });
  };

  const reset = () => {
    boardArray = ["", "", "", "", "", "", "", "", ""];
  };

  return {
    getBoard,
    setBoard,
    render,
    cells,
    checkWin,
    isDraw,
    reset,
  };
})();

// Display controller ...
const displayController = (() => {
  const playerOneName = document.querySelector("#playerx");
  const playerTwoName = document.querySelector("#playero");
  const resetButton = document.querySelector(".reset_button");
  const gameBoard = document.querySelector(".game_board");
  const form = document.querySelector(".player_info");
  const formDiv = document.querySelector(".input_form");
  const gameText = document.querySelector(".game_text");
  let playerOne;
  let playerTwo;
  let currentPlayer;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  gameBoard.addEventListener("click", (event) => {
    if (event.target.classList.contains("cell")) {
      if (event.target.textContent === "") {
        //event.target.textContent = currentPlayer.mark;
        currentPlayer.playTurn(event, currentPlayer.mark);
        gameText.textContent = `Player ${currentPlayer.mark}: ${currentPlayer.name}'s turn!`;
        if (boardObject.checkWin(currentPlayer)) {
          gameText.textContent = `${currentPlayer.name}'s a winner!`;
          boardObject.reset();
          boardObject.render();
          
        } else if (boardObject.isDraw(playerOne.mark, playerTwo.mark)) {
          gameText.textContent = `It's a Tie..`;
          boardObject.reset();
          boardObject.render();
        } else {
          switchPlayer();
          gameText.textContent = `Player ${currentPlayer.mark}: ${currentPlayer.name}'s turn!`;
        }
      }
    }
  });

  const init = () => {
    if (playerOneName.value !== "" && playerTwoName !== "") {
      playerOne = playerFactory(playerOneName.value, "X");
      playerTwo = playerFactory(playerTwoName.value, "O");
      currentPlayer = playerOne;
      gameText.textContent = `Player ${currentPlayer.mark}: ${currentPlayer.name}'s turn!`;
      
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (playerOneName.value !== "" && playerTwoName.value !== "") {
      init();
      
      formDiv.style.display = "none";
      gameBoard.classList.remove("hidden");
      resetButton.classList.remove("hidden");
    } else {
      window.location.reload();
    }
  });

  resetButton.addEventListener("click", () => {
    
   playerOneName.value = "";
   playerTwoName.value = "";
   window.location.reload();
    
  });
  return { currentPlayer, playerOne, playerTwo, init };
})();
