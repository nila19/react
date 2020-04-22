import React from 'react';
import { Formik, Field, Form, ErrorMessage, useField } from 'formik';

import { Checkbox as PrCheckbox } from 'primereact/checkbox';

export const Text = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const cls = meta.error ? ' red' : '';
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input type='text' name={props.name} {...props} {...field} className={'p-component p-filled' + cls} />
      <ErrorMessage name={props.name}>{(msg) => <span className='error'>{msg}</span>}</ErrorMessage>
    </div>
  );
};

export const Checkbox = ({ label, ...props }) => {
  /* <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Field type='checkbox' name={props.name} {...props} className='p-checkbox-box p-component' />
      <ErrorMessage name={props.name} />
    </div> */

  const [field, meta] = useField(props);

  return (
    <>
      <PrCheckbox inputId={props.id || props.name} name={props.name} {...props} {...field} checked={field.value} />
      <label htmlFor={props.id || props.name} className='p-checkbox-label'>
        {label}
      </label>
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  );
};

export const Select = ({ label, children, ...props }) => {
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Field as='select' name={props.name} {...props} className='p-dropdown-label p-inputtext p-placeholder'>
        {children}
      </Field>
      <ErrorMessage component='span' name={props.name} />
    </div>
  );
};
