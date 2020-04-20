import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';

// export const increment = createAction('INCREMENT');
// export const decrement = createAction('DECREMENT');
// const incrementBy = createAction('INCREMENT_BY');
// const decrementBy = createAction('DECREMENT_BY');

// export const counterReducer = createReducer(0, {
//   [increment]: (state) => state + 1,
//   [decrement]: (state) => state - 1,
// });

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

export const incrementAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, 1000);
};

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;

export const selectCount = (state) => state.counter;
