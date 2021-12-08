// Singular Module
const GameBoard = (() => {
  const gridElement = document.querySelector(".game-board");
  let turnOrder = 0;
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
    if (!gameBlock.placedOrNot) {
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
    turnOrder++;
    const turnElement = document.querySelector('#turn-count');
    const playerElement = document.querySelector('#current-player');
    turnElement.textContent = turnOrder;
    playerElement.textContent = turnOrder % 2 != 0 ? '2' : '1';
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
