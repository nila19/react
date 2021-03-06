import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

import { addTodo } from './todosSlice';

export default (props) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAddTodo = () => {
    dispatch(addTodo(text));
    setText('');
  };

  return (
    <Fieldset legend='Todo App'>
      <div className='p-grid'>
        <div className='p-col-6'>
          <InputText id='text' name='text' value={text} onChange={handleTextChange} placeholder='Enter todo text...' />
        </div>
        <div className='p-col-2'>
          <Button label='Add' onClick={handleAddTodo} />
        </div>
        <div className='p-col-2'>{props.pending && <ProgressSpinner style={{ width: '20px', height: '20px' }} />}</div>
      </div>
    </Fieldset>
  );
};
