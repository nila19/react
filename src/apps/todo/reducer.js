import { combineReducers } from 'redux';

export const ACTION = {
  TODO_ADD: 'TODO_ADD',
  TODO_TOGGLE: 'TODO_TOGGLE',
  CHANGE_VISIBILITY: 'CHANGE_VISIBILITY',
  PENDING_ADD: 'PENDING_ADD',
  PENDING_RESOLVE: 'PENDING_RESOLVE',
};

export const VISIBILITY = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  OPEN: 'OPEN',
};

const pending = (state = false, action) => {
  switch (action.type) {
    case ACTION.PENDING_ADD:
      return true;
    case ACTION.PENDING_RESOLVE:
      return false;
    default:
      return state;
  }
};

const visibilityFilter = (state = VISIBILITY.ALL, action) => {
  switch (action.type) {
    case ACTION.CHANGE_VISIBILITY:
      return action.visibility;
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case ACTION.TODO_ADD:
      return [...state, { id: state.length, text: action.text, completed: false }];
    case ACTION.TODO_TOGGLE:
      return state.map((e) => (e.id === action.id ? { ...e, completed: !e.completed } : e));
    default:
      return state;
  }
};

export const reducer = combineReducers({ pending, visibilityFilter, todos });
