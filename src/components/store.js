import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import { reducer } from '../features/todo/reducer';

// configuring redux store && middleware
export default () => {
  const loggerMiddleware = createLogger();
  const middleware = [thunkMiddleware, promiseMiddleware, loggerMiddleware];

  const enhancer = composeWithDevTools(applyMiddleware(...middleware));

  const store = createStore(reducer, enhancer);
  return store;
};
