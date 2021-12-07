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
      const blockElement = document.createElement("div");
      blockElement.textContent = i%2 != 0 ? 'o' : 'x';
      gameGrid.push(blockElement);
    }
    gameGrid.forEach(block => {
      gridElement.append(block);
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