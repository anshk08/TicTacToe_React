import React, { useState } from 'react';
import Board from './Board';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = [...squares];
    newSquares[i] = xIsNext ? 'X' : 'O';

    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderStatus = () => {
    const winner = calculateWinner(squares);

    if (winner) {
      return `Winner: ${winner}`;
    } else if (squares.every((square) => square)) {
      return 'Draw';
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">{renderStatus()}</div>
    </div>
  );
};

export default Game;
