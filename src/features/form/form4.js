import React from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Text, Checkbox, Select } from './inputs';

export default () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  return (
    <Formik
      initialValues={{
        friends: [],
        message: '',
      }}
      validationSchema={Yup.object({
        message: Yup.string().required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, resetForm }) => (
        <Form>
          <FieldArray
            name='friends'
            render={(arrayHelpers) => (
              <>
                {values.friends && values.friends.length > 0 ? (
                  values.friends.map((friend, index) => (
                    <div key={index} className='p-grid'>
                      <div className='p-col-4'>
                        <Text name={`friends[${index}].name`} placeholder='Name' />
                      </div>
                      <div className='p-col-4'>
                        <Text name={`friends[${index}].age`} placeholder='Age' />
                      </div>
                      <div className='p-col-4'>
                        <button type='button' onClick={() => arrayHelpers.remove(index)}>
                          -
                        </button>
                        <button type='button' onClick={() => arrayHelpers.push({})}>
                          +
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <button type='button' onClick={() => arrayHelpers.push({})}>
                      Add New
                    </button>
                  </div>
                )}
              </>
            )}
          />
          <div>
            <Text label='Message' name='message' placeholder='Message' />
          </div>
          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
          <button type='button' onClick={() => resetForm()}>
            Reset
          </button>
        </Form>
      )}
    </Formik>
  );
};
