import React, { useEffect, useReducer, useMemo, useRef, useContext } from 'react';

import { Button } from 'primereact/button';
import _ from 'lodash';

import { rootReducer as gameReducer, initialState } from './tictactoe-reducer';

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
  }, [props, previous]);

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

const GameDispatchContext = React.createContext(null);

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
  return state.sortOrder ? history : history.reverse();
};

const HistoryList = ({ state }) => {
  const dispatch = useContext(GameDispatchContext);
  const history = buildHistory(state, dispatch);
  return <div>{history}</div>;
};

const HistorySection = ({ state }) => {
  const dispatch = useContext(GameDispatchContext);
  return (
    <div className='game-info'>
      <div>
        <Button icon='pi pi-sort-alt' onClick={() => dispatch({ type: 'SORT' })} />
      </div>
      <HistoryList state={state} />
    </div>
  );
};

export default () => {
  // making the initial state as a function (3rd param) instead of const (2nd param)
  const [state, dispatch] = useReducer(gameReducer, undefined, initialState);

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

  const handleClick = (idx) => {
    if (move.winner || move.squares[idx]) {
      return;
    }
    dispatch({ type: 'MAKE_MOVE', idx, currentMove: state.currentMove });
  };

  return (
    <div className='game'>
      <div className='game-board'>
        <div className='status'>{status}</div>
        <Board move={move} onClick={handleClick} />
      </div>
      <GameDispatchContext.Provider value={dispatch}>
        <HistorySection state={state} />
      </GameDispatchContext.Provider>
    </div>
  );
};
