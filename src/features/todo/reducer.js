import { combineReducers } from 'redux';

import { ACTION, fulfilled, pending, rejected } from './actions';

const pendingAPI = (state = false, action) => {
  switch (action.type) {
    case pending(ACTION.ADD_TODO):
    case pending(ACTION.TOGGLE_TODO):
      return true;
    case fulfilled(ACTION.ADD_TODO):
    case rejected(ACTION.ADD_TODO):
    case fulfilled(ACTION.TOGGLE_TODO):
    case rejected(ACTION.TOGGLE_TODO):
      return false;
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case fulfilled(ACTION.ADD_TODO):
      return [...state, { id: state.length, text: action.payload, completed: false }];
    case fulfilled(ACTION.TOGGLE_TODO):
      return state.map((e) => (e.id === action.payload ? { ...e, completed: !e.completed } : e));
    default:
      return state;
  }
};

export const reducer = combineReducers({ pending: pendingAPI, todos });
