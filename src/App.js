// App.js

import React, { useState } from 'react';
import './App.scss';

const ROWS = 6;
const COLS = 7;

function App() {
  const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => null)));
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);

  function handleClick(col) {
    if (winner || board[0][col] !== null) return;
  
    const newBoard = board.slice();
    let row = ROWS - 1;
    while (row >= 0 && newBoard[row][col] !== null) {
      row--;
    }
    if (row < 0) return;
  
    newBoard[row][col] = player;
    setBoard(newBoard);
  
    if (checkWin(newBoard, row, col)) {
      setWinner(player);
      setSelectedCell(null); // clear selected cell when there is a winner
    } else {
      setPlayer(player === 1 ? 2 : 1);
      setSelectedCell({ row, col }); // set selected cell when the move is valid
    }
  }
  

  function checkWin(board, row, col) {
    // check horizontal
    let count = 1;
    for (let i = col - 1; i >= 0 && board[row][i] === player; i--) {
      count++;
    }
    for (let i = col + 1; i < COLS && board[row][i] === player; i++) {
      count++;
    }
    if (count >= 4) return true;

    // check vertical
    count = 1;
    for (let i = row - 1; i >= 0 && board[i][col] === player; i--) {
      count++;
    }
    for (let i = row + 1; i < ROWS && board[i][col] === player; i++) {
      count++;
    }
    if (count >= 4) return true;

    // check diagonal 1
    count = 1;
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0 && board[i][j] === player; i--, j--) {
      count++;
    }
    for (let i = row + 1, j = col + 1; i < ROWS && j < COLS && board[i][j] === player; i++, j++) {
      count++;
    }
    if (count >= 4) return true;

    // check diagonal 2
    count = 1;
    for (let i = row - 1, j = col + 1; i >= 0 && j < COLS && board[i][j] === player; i--, j++) {
      count++;
    }
    for (let i = row + 1, j = col - 1; i < ROWS && j >= 0 && board[i][j] === player; i++, j--) {
      count++;
    }
    if (count >= 4) return true;

    return false;
  }

  function renderPiece(row, col, onClick) {
    const piece = board[row][col];
    const classes = ['cell'];
    if (piece === 1) {
      classes.push('red');
    } else if (piece === 2) {
      classes.push('yellow');
    }
    if (board[0][col] === null) {
      classes.push('selectable');
    }
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      classes.push('selected');
    }
  
    return <div key={col} className={classes.join(' ')} onClick={onClick}></div>;
  }
  
  function handleNewGame() {
    setBoard(Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => null)));
    setPlayer(1);
    setWinner(null);
    setSelectedCell(null);
  }
  

  function renderBoard() {
    const rows = [];
    for (let row = 0; row < ROWS; row++) {
      const cells = [];
      for (let col = 0; col < COLS; col++) {
        cells.push(renderPiece(row, col, () => handleClick(col)));
      }
      rows.push(<div key={row} className="row">{cells}</div>);
    }
    return rows;
  }
  

  function renderStatus() {
    if (winner) {
      return (
        <div className="status">
          Winner: {winner === 1 ? 'Red' : 'Yellow'}
          <button onClick={handleNewGame}>New Game</button>
        </div>
      );
    } else {
      return (
        <div className="status">
          Next player: {player === 1 ? 'Red' : 'Yellow'}
          <button onClick={handleNewGame}>New Game</button>
        </div>
      );
    }
  }

  return (
    <div className="app">
      {renderStatus()}
      <div className="board">
        {renderBoard()}
      </div>
    </div>
  );
}

export default App;