import { connect } from 'react-redux';

import TodoList from './todoList';
import { ACTION, VISIBILITY } from '../reducer';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VISIBILITY.ALL:
      return todos;
    case VISIBILITY.OPEN:
      return todos.filter((e) => !e.completed);
    case VISIBILITY.COMPLETED:
      return todos.filter((e) => e.completed);
  }
};

const toggleTodo = (id) => {
  return {
    type: ACTION.TODO_TOGGLE,
    id: id,
  };
};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
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
