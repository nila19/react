import React from 'react';
import { useDispatch } from 'react-redux';

import { VISIBILITY, changeVisibility } from './visibilitySlice';

const FilterLink = ({ visibility }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(changeVisibility({ visibility: visibility }));
    e.preventDefault();
  };

  return (
    <span>
      <a href='#' style={{ padding: '5px' }} onClick={handleClick}>
        {visibility}
      </a>
      |
    </span>
  );
};

export default () => {
  return (
    <div className='p-grid' style={{ margin: '10px' }}>
      <span style={{ paddingRight: '5px' }}>Show:</span>
      <FilterLink visibility={VISIBILITY.ALL} />
      <FilterLink visibility={VISIBILITY.COMPLETED} />
      <FilterLink visibility={VISIBILITY.OPEN} />
    </div>
  );
};
