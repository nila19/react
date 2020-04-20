import { configureStore } from '@reduxjs/toolkit';

import todoReducer from '../features/todo2/todoReducer';

export default configureStore({
  reducer: {
    todo: todoReducer,
  },
});
