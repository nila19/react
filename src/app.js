import React, { Component, Suspense } from 'react';
import DocumentTitle from 'react-document-title';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import { TabView, TabPanel } from 'primereact/tabview';

import { Clock } from './apps/clock';
import { MouseTracker, MouseTrackerHOC } from './apps/mouse';

const LoginControl = React.lazy(() => import('./apps/login'));
const Temperature = React.lazy(() => import('./apps/temperature'));
const ContextApp = React.lazy(() => import('./apps/context/app'));
const GameHookRedux = React.lazy(() => import('./apps/tictactoe-hook-redux'));
const Forms = React.lazy(() => import('./apps/forms'));
const ProductHook = React.lazy(() => import('./apps/product-hook'));
const TodoApp = React.lazy(() => import('./apps/todo/app'));

// const Game = React.lazy(() => import('./apps/tictactoe'));
// const GameHook = React.lazy(() => import('./apps/tictactoe-hook'));
// const Product = React.lazy(() => import('./apps/product'));

const WithSuspense = (props) => {
  const loading = <div>Loading...</div>;
  return (
    <DocumentTitle title={props.title}>
      <Suspense fallback={loading}>{props.render()}</Suspense>
    </DocumentTitle>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 7,
    };
  }

  handleTabClick = (event) => {
    this.setState({ activeIndex: event.index });
  };

  render = () => {
    const mouse = (
      <>
        <MouseTracker />
        <MouseTrackerHOC />
      </>
    );

    return (
      <div>
        <Clock />
        <TabView activeIndex={this.state.activeIndex} onTabChange={this.handleTabClick}>
          <TabPanel header='Login' leftIcon='pi pi-sign-in'>
            <WithSuspense title='Login' render={() => <LoginControl />} />
          </TabPanel>
          <TabPanel header='GameHookRedux' leftIcon='pi pi-play'>
            <WithSuspense title='GameHookRedux' icon='pi pi-play' render={() => <GameHookRedux />} />
          </TabPanel>
          <TabPanel header='Temperature' leftIcon='pi pi-sort-amount-up'>
            <WithSuspense title='Temperature' icon='pi pi-sort-amount-up' render={() => <Temperature />} />
          </TabPanel>
          <TabPanel header='Forms' leftIcon='pi pi-file'>
            <WithSuspense title='Forms' icon='pi pi-file' render={() => <Forms />} />
          </TabPanel>
          <TabPanel header='ProductHook' leftIcon='pi pi-file'>
            <WithSuspense title='ProductHook' icon='pi pi-file' render={() => <ProductHook />} />
          </TabPanel>
          <TabPanel header='Context' leftIcon='pi pi-file'>
            <WithSuspense title='Context' icon='pi pi-file' render={() => <ContextApp />} />
          </TabPanel>
          <TabPanel header='Mouse' leftIcon='pi pi-file'>
            <WithSuspense title='Mouse' icon='pi pi-file' render={() => mouse} />
          </TabPanel>
          <TabPanel header='Todo' leftIcon='pi pi-file'>
            <WithSuspense title='Todo' icon='pi pi-file' render={() => <TodoApp />} />
          </TabPanel>
          {/* <TabPanel header='TicTacToe' leftIcon='pi pi-play'>
              <WithSuspense title='TicTacToe' render={() => <Game />} />
            </TabPanel> */}
          {/* <TabPanel header='GameHook' leftIcon='pi pi-play'>
              <WithSuspense title='GameHook' icon='pi pi-play' render={() => <GameHook />} />
            </TabPanel> */}
          {/* <TabPanel header='Product' leftIcon='pi pi-file'>
              <WithSuspense title='Product' icon='pi pi-file' render={() => <Product />} />
            </TabPanel> */}
        </TabView>
      </div>
    );
  };
}
