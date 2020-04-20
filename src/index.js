import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './style/index.css';

import App from './components/app';
import Menu from './components/menu';
import configureStore from './components/store';
import { Clock } from './features/clock';

import counterStore from './components/counterStore';
import todoStore from './components/todoStore';

import Counter from './features/counter/counter';
import Todo2 from './features/todo2/app';

const store = configureStore();

const AppRoot = () => {
  return (
    <div>
      <Provider store={store}>
        <React.StrictMode>
          <Clock />
          <Router>
            <Menu />
            <App />
          </Router>
        </React.StrictMode>
      </Provider>
      <Provider store={counterStore}>
        <Counter />
      </Provider>
      <Provider store={todoStore}>
        <Router>
          <Todo2 />
        </Router>
      </Provider>
    </div>
  );
};

// ========================================
ReactDOM.render(<AppRoot />, document.getElementById('root'));
