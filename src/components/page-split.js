import React from 'react';

// adding 'holes' in a component to embed generic children received as props.
export const PageSplit = (props) => {
  return (
    <div>
      {props.top}
      <hr style={{ padding: '2px', height: '1px', backgroundColor: '#007AD9', border: 'none' }} />
      {props.bottom}
    </div>
  );
};
