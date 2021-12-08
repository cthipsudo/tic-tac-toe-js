// Singular Module
const GameBoard = (() => {
  const gridElement = document.querySelector(".game-board");
  const turnElement = document.querySelector("#turn-count");
  const playerElement = document.querySelector("#current-player");
  let turnOrder = 0;
  let gameOver = false;
  const gameGrid = [];
  const win = () => console.log("You won!");
  const lose = () => console.log("You lose");
  const nextTurn = () => turnOrder++;
  const showTurnOrder = () => turnOrder;
  const consoleGrid = () => console.log(gameGrid);
  const generateGame = () => {
    for (let i = 0; i < 9; i++) {
      let symbol = ""; //i%2 != 0 ? 'x' : 'o';
      const block = blockFactory(symbol, i, false);
      gameGrid.push(block);
    }
    gameGrid.forEach((block) => {
      const blockElement = document.createElement("div");
      const blockContent = document.createElement("p");
      blockElement.setAttribute("data-index", block.index);
      blockContent.textContent = block.symbol;
      blockElement.append(blockContent);
      gridElement.append(blockElement);
    });
    addBlocklisteners();
  };

  const changeBlock = (index) => {
    const gameBlock = gameGrid[index];
    if (!gameBlock.placedOrNot && !gameOver) {
      // if freespace
      gameBlock.symbol = turnOrder % 2 != 0 ? "x" : "o";
      gameBlock.placedOrNot = true;
      updateTurn();
    }
    return gameBlock.symbol;
  };

  const addBlocklisteners = () => {
    const blocks = document.querySelectorAll(".game-board div");
    blocks.forEach((block) => {
      block.addEventListener("click", () => {
        const index = block.getAttribute("data-index");
        block.textContent = changeBlock(index);
      });
    });
  };

  const updateTurn = () => {
    checkForWin();
    nextTurn();
    turnElement.textContent = turnOrder;
    playerElement.textContent = turnOrder % 2 != 0 ? "2" : "1";
  };

  const checkForWin = () => {
    loop: for (let i = 1; i <= 9; i++) {
      block = gameGrid[i - 1];
      currentSymbol = block.symbol;

      if (currentSymbol != "") {
        checkRowWin(i, currentSymbol);
        checkColWin(i, currentSymbol);
        // Check Cross
        checkCrossWin(i, currentSymbol);
      } 
    }
  };

  const checkRowWin = (i, currentSymbol) => {
    if (i % 3 === 0 && i != 0) {
      //Check for row matches
      //console.log('I fire');
      if (
        gameGrid[i - 2].symbol === currentSymbol &&
        gameGrid[i - 3].symbol === currentSymbol
      ) {
        winMessage();
      }
    }
  }
  const checkColWin = (i, currentSymbol) => {
    // Check Columns
    if (i <= 3) {
      if (
        gameGrid[i + 2].symbol === currentSymbol &&
        gameGrid[i + 5].symbol === currentSymbol
      ) {
        winMessage();
      }
    }
  }

  const checkCrossWin = (i, currentSymbol) => {
    console.log("I Check");
    if (i === 5) {
      console.log(
        `Comparing ${gameGrid[i - 5].symbol} and ${gameGrid[i + 3].symbol}`
      );
      if (
        gameGrid[i - 5].symbol === currentSymbol &&
        gameGrid[i + 3].symbol === currentSymbol
      ) {
        winMessage();
      }
      if (
        gameGrid[i - 3].symbol === currentSymbol &&
        gameGrid[i + 1].symbol === currentSymbol
      ) {
        winMessage();
      }
    }
  };

  const winMessage = () => {
    gameOver = true;
    const gameStatus = document.querySelector("#game-status");
    gameStatus.textContent = `Player ${turnOrder % 2 != 0 ? "2" : "1"} Wins!`;
  };
  return {
    win,
    lose,
    nextTurn,
    showTurnOrder,
    generateGame,
    consoleGrid,
  };
})();

const blockFactory = (symbol, index, placedOrNot) => {
  return {
    symbol,
    index,
    placedOrNot,
  };
};

// Factory function
const playerFactory = (symbol, score) => {
  const sayHi = () => console.log("Hi");
  return { symbol, score, sayHi };
};

const playerOne = playerFactory("x", 0);

const main = () => {
  GameBoard.generateGame();
  GameBoard.consoleGrid();
};

main();
