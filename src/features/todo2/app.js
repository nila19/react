import React from 'react';

import AddTodo from './todos/addTodo';
import { TodoListContainer } from './todos/todosSlice';
import Visibility from './visibility/visibility';

const TodoListPanel = () => {
  return <TodoListContainer />;
};

export default () => {
  return (
    <div>
      <div className='p-grid'>
        <div className='p-col-6'>
          <AddTodo />
          <TodoListPanel />
          <Visibility />
        </div>
      </div>
    </div>
  );
};
