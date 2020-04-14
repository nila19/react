import React, { useEffect, useReducer, useMemo, useRef } from 'react';

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

// custom hook - hold previous state/props value
const usePrevious = (props) => {
  const previous = useRef();
  useEffect(() => {
    previous.current = props;
  });
  return previous.current;
};

const Board = (props) => {
  const previous = usePrevious(props);
  useEffect(() => {
    console.log('Old Props = ' + JSON.stringify(previous) + ' :: New Props = ' + JSON.stringify(props));
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

const buildNewMove = (lastMove, idx) => {
  const squares = lastMove.squares.slice();
  squares[idx] = lastMove.isXNext ? 'X' : 'O';
  const winnerLine = calculateWinner(squares);
  const winner = winnerLine == null ? null : squares[winnerLine[0]];
  return {
    squares: squares,
    isXNext: !lastMove.isXNext,
    filledIdx: idx,
    winner: winner,
    winnerLine: winnerLine,
  };
};

const initialState = () => ({
  currentMove: 0,
  sort: true,
  moves: [
    {
      squares: Array(9).fill(null),
      isXNext: true,
      filledIdx: null,
      winner: null,
      winnerLine: null,
    },
  ],
});

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'MAKE_MOVE':
      const lastMove = state.moves[state.currentMove];
      if (lastMove.winner || lastMove.squares[action.idx]) {
        return state;
      }
      const newMove = buildNewMove(lastMove, action.idx);
      const pastMoves = state.moves.slice(0, state.currentMove + 1);
      const moves = pastMoves.concat(newMove);
      return { ...state, moves, currentMove: state.currentMove + 1 };
    case 'PICK_MOVE':
      return { ...state, currentMove: action.idx };
    case 'SORT':
      return { ...state, sort: !state.sort };
    default:
      throw new Error('Invalid action type');
  }
};

// const HistorySection = (props) => {};

export default () => {
  // making the initial state as a function (3rd param) instead of const (2nd param)
  const [state, dispatch] = useReducer(gameReducer, undefined, initialState);

  const buildHistory = (state, dispatch) => {
    const history = state.moves.map((move, idx) => {
      const desc = idx ? 'Move #' + idx + ' (' + (move.filledIdx + 1) + ')' : 'Go to start';
      const className = idx === state.currentMove ? 'p-button-success' : 'p-button-secondary';
      return (
        <div key={idx} style={{ padding: '2px' }}>
          <Button label={desc} className={className} onClick={() => dispatch({ type: 'PICK_MOVE', idx })} />
        </div>
      );
    });
    return state.sort ? history : history.reverse();
  };

  const move = state.moves[state.currentMove];

  // memoized function to skip re-evaluation if the move param did not change.
  const status = useMemo(() => {
    console.log('Inside memoized function => Calculating status..');
    if (move.winner) {
      return 'Winner: ' + move.winner;
    } else if (!_.includes(move.squares, null)) {
      return 'Match is drawn';
    } else {
      return 'Next player: ' + (move.isXNext ? 'X' : 'O');
    }
  }, [move]);

  const history = buildHistory(state, dispatch);

  return (
    <div className='game'>
      <div className='game-board'>
        <div className='status'>{status}</div>
        <Board move={move} onClick={(idx) => dispatch({ type: 'MAKE_MOVE', idx })} />
      </div>
      <div className='game-info'>
        <div>
          <Button icon='pi pi-sort-alt' onClick={() => dispatch({ type: 'SORT' })} />
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
