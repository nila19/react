import { combineReducers } from 'redux';

// export const rootReducer = (state, action) => {
//   return {
//     currentMove: currentMove(state.currentMove, action),
//     sortOrder: sortOrder(state.sortOrder, action),
//     moves: moves(state.moves, action),
//   };
// };

const currentMove = (state = 0, action) => {
  switch (action.type) {
    case 'MAKE_MOVE':
      return state + 1;
    case 'PICK_MOVE':
      return action.idx;
    default:
      return state;
  }
};

const sortOrder = (state = true, action) => {
  switch (action.type) {
    case 'SORT':
      return !state;
    default:
      return state;
  }
};

const moves = (state = [], action) => {
  switch (action.type) {
    case 'MAKE_MOVE':
      const lastMove = state[action.currentMove];
      const newMove = buildNewMove(lastMove, action.idx);
      const pastMoves = state.slice(0, action.currentMove + 1);
      return pastMoves.concat(newMove);
    default:
      return state;
  }
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

export const initialState = () => ({
  currentMove: 0,
  sortOrder: true,
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

export const rootReducer = combineReducers({ currentMove, sortOrder, moves });
// const store = createStore(rootReducer);
