
// Singular Module
const GameBoard = (() => {
  let turnOrder = 0;
  const win = () => console.log('You won!');
  const lose = () => console.log('You lose');
  const nextTurn = () => turnOrder++; 
  const showTurnOrder = () => turnOrder;
  return {
    win,
    lose,
    nextTurn,
    showTurnOrder,
  }; 
})();

// Factory function
const playerFactory = (symbol, score) => {
  const sayHi = () => console.log('Hi');
  return {symbol, score, sayHi};
}

const playerOne = playerFactory('x', 0);

