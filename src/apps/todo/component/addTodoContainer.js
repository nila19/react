import { connect } from 'react-redux';

import AddTodo from './addTodo';
import { ACTION } from '../reducer';

const addTodo = (text) => {
  return {
    type: ACTION.TODO_ADD,
    text,
  };
};

const pendingAdd = () => {
  return { type: ACTION.PENDING_ADD };
};

const pendingResolve = () => {
  return { type: ACTION.PENDING_RESOLVE };
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
    addTodo: async (text) => {
      dispatch(pendingAdd());
      await delay(2000);
      dispatch(addTodo(text));
      dispatch(pendingResolve());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
