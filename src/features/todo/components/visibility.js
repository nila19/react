import React from 'react';

import { NavLink, useRouteMatch } from 'react-router-dom';

export const VISIBILITY = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  OPEN: 'OPEN',
};

const FilterLink = ({ visibility }) => {
  let { url } = useRouteMatch();
  return (
    <span>
      <NavLink style={{ padding: '5px' }} to={visibility === VISIBILITY.ALL ? url : `${url}/${visibility}`}>
        {visibility}
      </NavLink>
      |
    </span>
  );
};

export default (props) => {
  return (
    <div className='p-grid' style={{ margin: '10px' }}>
      <span style={{ paddingRight: '5px' }}>Show:</span>
      <FilterLink visibility={VISIBILITY.ALL} />
      <FilterLink visibility={VISIBILITY.COMPLETED} />
      <FilterLink visibility={VISIBILITY.OPEN} />
    </div>
  );
};
