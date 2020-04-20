import { combineReducers } from '@reduxjs/toolkit';

import todosReducer from './todos/todosSlice';
import visibilityReducer from './visibility/visibilitySlice';

export default combineReducers({ todos: todosReducer, visibility: visibilityReducer });
