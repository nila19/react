import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './index.css';

import App from './app';
import { reducer } from './apps/todo/reducer';

// configuring redux store && middleware
const loggerMiddleware = createLogger();
const store = createStore(reducer, applyMiddleware(loggerMiddleware));

const AppRoot = () => {
  return (
    <div>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </div>
  );
};

// ========================================
ReactDOM.render(<AppRoot />, document.getElementById('root'));
