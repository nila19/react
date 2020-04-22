import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Text, Checkbox, Select } from './inputs';
import Form4 from './form4';

export default () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          age: 0,
          adult: false,
          color: 'blue',
          terms: false,
        }}
        validationSchema={Yup.object({
          lastName: Yup.string().max(10, 'Max 10').min(5, 'Min 5').required('Required'),
          // email: Yup.string().email('Invalid email').required('Required'),
          age: Yup.number().required('Required').min(20, 'Must be > 20').max(50, 'Must be < 50'),
          // color: Yup.string().required('Required'),
          terms: Yup.boolean().oneOf([true], 'Required').required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          setTimeout(() => setSubmitting(false), 2000);
        }}
      >
        {(formik) => (
          <Form>
            <div className='p-grid'>
              <div className='p-col-4'>
                <div>
                  <label htmlFor='email'>Email Address</label>
                  <Field type='text' name='email' placeholder='Email id' className='p-inputtext p-component p-filled' />
                  <ErrorMessage name='email' />
                </div>
              </div>
              <div className='p-col-4'>
                <div>
                  <label htmlFor='firstName'>First Name</label>
                  <Field name='firstName' as='textarea' rows={2} className='p-inputtext p-component p-filled' />
                  <ErrorMessage name='firstName' />
                </div>
              </div>
              <div className='p-col-4'>
                <Text label='Last Name' name='lastName' />
              </div>
            </div>
            <div className='p-grid'>
              <div className='p-col-4'>
                <Text label='Age' name='age' placeholder='Age' />
              </div>
              <div className='p-col-2'>
                <Select label='Color2' name='color2' as='select'>
                  <option value=''>Select</option>
                  <option value='red'>Red</option>
                  <option value='blue'>Blue</option>
                  <option value='green'>Green</option>
                </Select>
              </div>
              <div className='p-col-2'>
                <div>
                  <label htmlFor='color'>Color</label>
                  <Field name='color' as='select' placeholder='Color'>
                    <option value=''>Select</option>
                    <option value='red'>Red</option>
                    <option value='blue'>Blue</option>
                    <option value='green'>Green</option>
                  </Field>
                  <ErrorMessage name='color' />
                </div>
              </div>
              <div className='p-col-2'>
                <Checkbox label='Adult' name='adult' />
              </div>
              <div className='p-col-2'>
                <div>
                  <label htmlFor='terms'>Terms</label>
                  <Field name='terms' type='checkbox' />
                  <ErrorMessage name='terms' />
                </div>
              </div>
            </div>
            <button type='submit' disabled={formik.isSubmitting}>
              Submit
            </button>
            <button type='button' onClick={() => formik.resetForm()}>
              Reset
            </button>
          </Form>
        )}
      </Formik>
      <hr />
      <Form4 />
    </>
  );
};
