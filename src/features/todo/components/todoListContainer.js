import { connect } from 'react-redux';

import TodoList from './todoList';
import { ACTION } from '../actions';
import { VISIBILITY } from './visibility';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VISIBILITY.ALL:
      return todos;
    case VISIBILITY.OPEN:
      return todos.filter((e) => !e.completed);
    case VISIBILITY.COMPLETED:
      return todos.filter((e) => e.completed);
    default:
      return todos;
  }
};

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

const toggleTodo = (id) => {
  return {
    type: ACTION.TOGGLE_TODO,
    async payload() {
      await delay(500);
      return id;
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(state.todos, ownProps.filter),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
