import React, { Component } from 'react';

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

// HOC
const withLogging = (WrappedComponent) => {
  class WithLogging extends Component {
    componentDidUpdate(prevProps) {
      console.log('Previous props = ' + JSON.stringify(prevProps));
      console.log('New Props = ' + JSON.stringify(this.props));
    }
    render = () => {
      return <WrappedComponent {...this.props} />;
    };
  }
  WithLogging.displayName = `WithLogging(${getDisplayName(WrappedComponent)})`;
  return WithLogging;
};

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const Board = (props) => {
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

const BoardWithLogging = withLogging(Board);

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  handleClick = (i) => {
    const move = this.state.moves[this.state.currentMove];
    const squares = move.squares.slice();
    if (squares[i] || move.winner) {
      return;
    }
    squares[i] = move.isXNext ? 'X' : 'O';
    const winnerLine = calculateWinner(squares);
    const winner = winnerLine == null ? null : squares[winnerLine[0]];

    const moves = this.state.moves.slice(0, this.state.currentMove + 1);
    moves.push({
      squares: squares,
      isXNext: !move.isXNext,
      filledIdx: i,
      winner: winner,
      winnerLine: winnerLine,
    });
    this.setState((state) => ({ currentMove: state.currentMove + 1, moves: moves }));
  };

  buildHistory = (moves, currentMove, sort) => {
    const histories = moves.map((move, idx) => {
      const desc = idx ? 'Move #' + idx + ' (' + (move.filledIdx + 1) + ')' : 'Go to start';
      const className = idx === currentMove ? 'p-button-success' : 'p-button-secondary';
      return (
        <div key={idx} style={{ padding: '2px' }}>
          <Button label={desc} className={className} onClick={() => this.jumpTo(idx)} />
        </div>
      );
    });
    return sort ? histories : histories.reverse();
  };

  buildStatus = (move) => {
    if (move.winner) {
      return 'Winner: ' + move.winner;
    } else if (!_.includes(move.squares, null)) {
      return 'Match is drawn';
    } else {
      return 'Next player: ' + (move.isXNext ? 'X' : 'O');
    }
  };

  jumpTo = (idx) => {
    this.setState({ currentMove: idx });
  };

  sortIt = () => {
    this.setState({ sort: !this.state.sort });
  };

  render() {
    const { moves, currentMove, sort } = this.state;
    const status = this.buildStatus(moves[currentMove]);
    const history = this.buildHistory(moves, currentMove, sort);

    return (
      <div className='game'>
        <div className='game-board'>
          <div className='status'>{status}</div>
          <BoardWithLogging move={this.state.moves[this.state.currentMove]} onClick={this.handleClick} />
        </div>
        <div className='game-info'>
          <div>
            <Button icon='pi pi-sort-alt' onClick={this.sortIt} />
          </div>
          <div>{history}</div>
        </div>
      </div>
    );
  }
}

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
