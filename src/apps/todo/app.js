import React from 'react';

import TodoListContainer from './component/todoListContainer';
import VisibilityContainer from './component/visibilityContainer';
import AddTodoContainer from './component/addTodoContainer';

export default () => {
  return (
    <div>
      <div className='p-grid'>
        <div className='p-col-6'>
          <AddTodoContainer />
          <TodoListContainer />
          <VisibilityContainer />
        </div>
      </div>
    </div>
  );
};
