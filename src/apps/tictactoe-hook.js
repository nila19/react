import React, { useState, useEffect } from 'react';

import { Button } from 'primereact/button';

import _ from 'lodash';

const Square = (props) => {
  return (
    <Button
      style={{ width: '50px', height: '50px' }}
      label={props.code || '.'}
      className={props.isWinCell ? 'p-button-warning' : 'p-button-secondary'}
      onClick={props.onClick}
    />
  );
};

const Board = (props) => {
  useEffect(() => {
    console.log('New Props = ' + JSON.stringify(props));
  }, [props]);

  const { winnerLine, squares } = props.move;
  const renderSquare = (i) => {
    const isWinCell = _.includes(winnerLine, i);
    return <Square key={i} code={squares[i]} isWinCell={isWinCell} onClick={() => props.onClick(i)} />;
  };

  const renderRow = (i) => {
    const row = [0, 1, 2].map((e) => renderSquare(i + e));
    return (
      <div key={i} className='board-row'>
        {row}
      </div>
    );
  };

  const rows = [0, 3, 6].map((e) => renderRow(e));
  return <div>{rows}</div>;
};

export default () => {
  const [currentMove, setCurrentMove] = useState(0);
  const [sort, setSort] = useState(true);
  const [moves, setMoves] = useState([
    {
      squares: Array(9).fill(null),
      isXNext: true,
      filledIdx: null,
      winner: null,
      winnerLine: null,
    },
  ]);

  const handleClick = (i) => {
    const move = moves[currentMove];
    const squares = move.squares.slice();
    if (squares[i] || move.winner) {
      return;
    }
    squares[i] = move.isXNext ? 'X' : 'O';
    const winnerLine = calculateWinner(squares);
    const winner = winnerLine == null ? null : squares[winnerLine[0]];

    const pastMoves = moves.slice(0, currentMove + 1);
    pastMoves.push({
      squares: squares,
      isXNext: !move.isXNext,
      filledIdx: i,
      winner: winner,
      winnerLine: winnerLine,
    });
    setCurrentMove((currentMove) => currentMove + 1);
    setMoves(pastMoves);
  };

  const buildHistory = () => {
    const history = moves.map((move, idx) => {
      const desc = idx ? 'Move #' + idx + ' (' + (move.filledIdx + 1) + ')' : 'Go to start';
      const className = idx === currentMove ? 'p-button-success' : 'p-button-secondary';
      return (
        <div key={idx} style={{ padding: '2px' }}>
          <Button label={desc} className={className} onClick={() => setCurrentMove(idx)} />
        </div>
      );
    });
    return sort ? history : history.reverse();
  };

  const buildStatus = () => {
    const move = moves[currentMove];
    if (move.winner) {
      return 'Winner: ' + move.winner;
    } else if (!_.includes(move.squares, null)) {
      return 'Match is drawn';
    } else {
      return 'Next player: ' + (move.isXNext ? 'X' : 'O');
    }
  };

  const status = buildStatus();
  const history = buildHistory();

  return (
    <div className='game'>
      <div className='game-board'>
        <div className='status'>{status}</div>
        <Board move={moves[currentMove]} onClick={handleClick} />
      </div>
      <div className='game-info'>
        <div>
          <Button icon='pi pi-sort-alt' onClick={() => setSort((sort) => !sort)} />
        </div>
        <div>{history}</div>
      </div>
    </div>
  );
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
};
