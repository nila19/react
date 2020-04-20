import { connect } from 'react-redux';
import { createSlice, createSelector } from '@reduxjs/toolkit';

import { VISIBILITY, selectVisibility } from '../visibility/visibilitySlice';
import TodoList from './todoList';

let todoId = 0;

const generateId = () => {
  todoId = todoId + 1;
  return todoId;
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.push({ id: action.payload.id, text: action.payload.text, completed: false });
      },
      prepare: (text) => {
        return { payload: { id: generateId(), text } };
      },
    },
    toggleTodo: (state, action) => {
      const todo = state.find((e) => e.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;

const selectTodos = (state) => state.todo.todos;

const selectVisibleTodos = createSelector([selectTodos, selectVisibility], (todos, visibility) => {
  console.log('Filtering todos.');
  switch (visibility) {
    case VISIBILITY.ALL:
      return todos;
    case VISIBILITY.OPEN:
      return todos.filter((e) => !e.completed);
    case VISIBILITY.COMPLETED:
      return todos.filter((e) => e.completed);
    default:
      return todos;
  }
});

const mapStateToProps = (state) => ({
  todos: selectVisibleTodos(state),
});

const mapDispatch = { toggleTodo };

export const TodoListContainer = connect(mapStateToProps, mapDispatch)(TodoList);
