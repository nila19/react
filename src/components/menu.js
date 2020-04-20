import React from 'react';

import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className='p-grid'>
      <div className='p-col-12'>
        <nav>
          | <Link to='/login'>Login</Link> | <Link to='/game'>Game</Link> | <Link to='/temperature'>Temperature</Link> |{' '}
          <Link to='/form'>Form</Link> | <Link to='/product'>Product</Link> | <Link to='/context'>Context</Link> |{' '}
          <Link to='/mouse'>Mouse</Link> | <Link to='/todo'>Todo</Link> |
        </nav>
      </div>
    </div>
  );
};
