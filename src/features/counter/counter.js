import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { decrement, increment, incrementAsync, selectCount } from './counterSlice';

import styles from './counter.module.css';

export default () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.row}>
        <button className={styles.button} aria-label='Increment value' onClick={() => dispatch(increment())}>
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button className={styles.button} aria-label='Decrement value' onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
      <div className={styles.row}>
        <button className={styles.asyncButton} onClick={() => dispatch(incrementAsync())}>
          Add Async
        </button>
      </div>
    </div>
  );
};
