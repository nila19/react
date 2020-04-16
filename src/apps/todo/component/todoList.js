import React from 'react';

import { Checkbox } from 'primereact/checkbox';

const Todo = (props) => {
  return (
    <div className='p-grid'>
      <div className='p-col-2'>
        <Checkbox checked={props.todo.completed} onChange={() => props.onTodoClick(props.todo.id)} />
      </div>
      <div className='p-col-6'>{props.todo.text}</div>
    </div>
  );
};

export default (props) => {
  const todoItems = props.todos.map((e) => <Todo key={e.id} todo={e} onTodoClick={props.onTodoClick} />);
  return (
    <>
      <div className='p-grid'>
        <div className='p-col-8' style={{ textAlign: 'center' }}>
          <b>Todos</b>
        </div>
      </div>
      {todoItems}
    </>
  );
};
