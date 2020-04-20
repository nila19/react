import { createSlice } from '@reduxjs/toolkit';

export const VISIBILITY = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  OPEN: 'OPEN',
};

const visibilitySlice = createSlice({
  name: 'visibility',
  initialState: VISIBILITY.ALL,
  reducers: {
    changeVisibility: (state, action) => {
      return action.payload.visibility;
    },
  },
});

export const { changeVisibility } = visibilitySlice.actions;

export default visibilitySlice.reducer;

export const selectVisibility = (state) => state.todo.visibility;
