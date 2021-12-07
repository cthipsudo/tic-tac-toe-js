// Singular Module
const GameBoard = (() => {
  const gridElement = document.querySelector(".game-board");
  let turnOrder = 0;
  const gameGrid = [];
  const win = () => console.log("You won!");
  const lose = () => console.log("You lose");
  const nextTurn = () => turnOrder++;
  const showTurnOrder = () => turnOrder;
  const generateGame = () => {
    for (let i = 0; i < 9; i++) {
      let symbol = i%2 != 0 ? 'x' : 'o';
      const block = blockFactory(symbol, i, true);
      gameGrid.push(block);
    }
    gameGrid.forEach(block => {
      const blockElement = document.createElement("div");
      const blockContent = document.createElement('p');

      blockContent.textContent = block.symbol;
      blockElement.append(blockContent);
      gridElement.append(blockElement);
    });
  };
  return {
    win,
    lose,
    nextTurn,
    showTurnOrder,
    generateGame,
  };
})();

const blockFactory = (symbol, index, placedOrNot) => {
  return{
    symbol,
    index,
    placedOrNot
  }
}

// Factory function
const playerFactory = (symbol, score) => {
  const sayHi = () => console.log("Hi");
  return { symbol, score, sayHi };
};

const playerOne = playerFactory("x", 0);


const main = () => {
  GameBoard.generateGame();
}

main();