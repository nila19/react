import React from 'react';
import { Route, useRouteMatch, useParams } from 'react-router-dom';

import TodoListContainer from './components/todoListContainer';
import Visibility from './components/visibility';
import AddTodoContainer from './components/addTodoContainer';

import { VISIBILITY } from './components/visibility';

const TodoListPanel = () => {
  let { filter } = useParams();
  return <TodoListContainer filter={filter || VISIBILITY.ALL} />;
};

export default () => {
  let { path } = useRouteMatch();

  return (
    <div>
      <div className='p-grid'>
        <div className='p-col-6'>
          <AddTodoContainer />
          <Route path={`${path}/:filter?`}>
            <TodoListPanel />
          </Route>
          <Visibility />
        </div>
      </div>
    </div>
  );
};
