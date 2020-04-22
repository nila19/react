import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(10, 'Max 10').min(5, 'Min 5').required('Required'),
      lastName: Yup.string().max(10, 'Max 10').min(5, 'Min 5').required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor='email'>Email Address</label>
        <input name='email' {...formik.getFieldProps('email')} />
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
      </div>
      <div>
        <label htmlFor='firstName'>First Name</label>
        <input name='firstName' {...formik.getFieldProps('firstName')} />
        {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
      </div>
      <div>
        <label htmlFor='lastName'>Last Name</label>
        <input name='lastName' {...formik.getFieldProps('lastName')} />
        {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};
