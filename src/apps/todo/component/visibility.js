import React from 'react';

import { RadioButton } from 'primereact/radiobutton';

import { VISIBILITY } from '../reducer';

const VisibilityOption = (props) => {
  return (
    <div className='p-col-4'>
      <RadioButton
        inputId={'visibility_' + props.visibilityOption}
        name='visibility'
        value={props.visibilityOption}
        checked={props.visibility === props.visibilityOption}
        onChange={() => props.changeVisibility(props.visibilityOption)}
      />
      <label htmlFor={'visibility_' + props.visibilityOption} className='p-checkbox-label'>
        {'Show ' + props.visibilityOption}
      </label>
    </div>
  );
};

export default (props) => {
  return (
    <div className='p-grid'>
      <VisibilityOption {...props} visibilityOption={VISIBILITY.ALL} />
      <VisibilityOption {...props} visibilityOption={VISIBILITY.COMPLETED} />
      <VisibilityOption {...props} visibilityOption={VISIBILITY.OPEN} />
    </div>
  );
};
