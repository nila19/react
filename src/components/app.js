import React, { Suspense } from 'react';
import DocumentTitle from 'react-document-title';
import { Route, Switch } from 'react-router-dom';

import { Panel } from 'primereact/panel';

import { MouseTracker, MouseTrackerHOC } from '../features/mouse';
const LoginControl = React.lazy(() => import('../features/login'));
const Temperature = React.lazy(() => import('../features/temperature'));
const ContextApp = React.lazy(() => import('../features/context/app'));
const GameHookRedux = React.lazy(() => import('../features/game/tictactoe-hook-redux'));
const Form = React.lazy(() => import('../features/form'));
const ProductHook = React.lazy(() => import('../features/product/product-hook'));
const TodoApp = React.lazy(() => import('../features/todo/app'));

// const Game = React.lazy(() => import('../features/game/tictactoe'));
// const GameHook = React.lazy(() => import('../features/game/tictactoe-hook'));
// const Product = React.lazy(() => import('../features/product/product'));

const WithSuspense = (props) => {
  const loading = <div>Loading...</div>;
  return (
    <DocumentTitle title={props.title}>
      <Panel header={props.title}>
        <Suspense fallback={loading}>{props.render()}</Suspense>
      </Panel>
    </DocumentTitle>
  );
};

export default () => {
  const mouse = (
    <>
      <MouseTracker />
      <MouseTrackerHOC />
    </>
  );

  return (
    <div>
      <Switch>
        <Route path='/login'>
          <WithSuspense title='Login' render={() => <LoginControl />} />
        </Route>
        <Route path='/game'>
          <WithSuspense title='GameHookRedux' icon='pi pi-play' render={() => <GameHookRedux />} />
        </Route>
        <Route path='/temperature'>
          <WithSuspense title='Temperature' icon='pi pi-sort-amount-up' render={() => <Temperature />} />
        </Route>
        <Route path='/form'>
          <WithSuspense title='Form' icon='pi pi-file' render={() => <Form />} />
        </Route>
        <Route path='/product'>
          <WithSuspense title='Product' icon='pi pi-file' render={() => <ProductHook />} />
        </Route>
        <Route path='/context'>
          <WithSuspense title='Context' icon='pi pi-file' render={() => <ContextApp />} />
        </Route>
        <Route path='/mouse'>
          <WithSuspense title='Mouse' icon='pi pi-file' render={() => mouse} />
        </Route>
        <Route path='/todo'>
          <WithSuspense title='Todo' icon='pi pi-file' render={() => <TodoApp />} />
        </Route>
      </Switch>
    </div>
  );
};
