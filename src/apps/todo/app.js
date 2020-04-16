import React from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import { reducer } from './reducer';

import TodoListContainer from './component/todoListContainer';
import VisibilityContainer from './component/visibilityContainer';
import AddTodoContainer from './component/addTodoContainer';

const loggerMiddleware = createLogger();

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

export default () => {
  return (
    <Provider store={store}>
      <div>
        <div className='p-grid'>
          <div className='p-col-6'>
            <AddTodoContainer />
            <TodoListContainer />
            <VisibilityContainer />
          </div>
        </div>
      </div>
    </Provider>
  );
};
