import { connect } from 'react-redux';

import AddTodo from './addTodo';
import { ACTION } from '../actions';

const addTodo = (text) => {
  return {
    type: ACTION.ADD_TODO,
    async payload() {
      await delay(1000);
      return text;
    },
  };
};

const addTodoThunk = (text) => {
  return (dispatch) => {
    if (text === '') {
      console.log('Stopped by thunk...');
      return;
    }
    dispatch(addTodo(text));
  };
};

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

const mapStateToProps = (state) => {
  return {
    pending: state.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (text) => {
      dispatch(addTodoThunk(text));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
