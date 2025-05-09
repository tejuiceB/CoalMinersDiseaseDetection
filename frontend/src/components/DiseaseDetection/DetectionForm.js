import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './style.css';

const validationSchema = Yup.object().shape({
  Age: Yup.number()
    .required('Required')
    .min(18, 'Age must be at least 18')
    .max(100, 'Age must be less than 100'),
  Years_in_Mining: Yup.number()
    .required('Required')
    .min(0, 'Cannot be negative')
    .max(50, 'Must be less than 50 years'),
  Smoking_History: Yup.number()
    .required('Required')
    .oneOf([0, 1], 'Must be 0 or 1'),
  Cough_Frequency: Yup.number()
    .required('Required')
    .oneOf([0, 1, 2], 'Must be 0, 1 or 2'),
  Breathlessness: Yup.number()
    .required('Required')
    .oneOf([0, 1], 'Must be 0 or 1'),
  Chest_Pain: Yup.number()
    .required('Required')
    .oneOf([0, 1], 'Must be 0 or 1'),
  Oxygen_Saturation: Yup.number()
    .required('Required')
    .min(80, 'Must be at least 80')
    .max(100, 'Must be less than 100'),
  Heart_Rate: Yup.number()
    .required('Required')
    .min(40, 'Must be at least 40')
    .max(200, 'Must be less than 200'),
  Body_Temperature: Yup.number()
    .required('Required')
    .min(35, 'Must be at least 35')
    .max(42, 'Must be less than 42'),
  Air_Quality_Index: Yup.number()
    .required('Required')
    .min(0, 'Cannot be negative')
    .max(500, 'Must be less than 500'),
  PM2_5_Level: Yup.number()
    .required('Required')
    .min(0, 'Cannot be negative')
    .max(500, 'Must be less than 500'),
  CO_Level: Yup.number()
    .required('Required')
    .min(0, 'Cannot be negative')
    .max(50, 'Must be less than 50'),
  Temperature: Yup.number()
    .required('Required')
    .min(-20, 'Must be at least -20')
    .max(50, 'Must be less than 50'),
  PPE_Usage: Yup.number()
    .required('Required')
    .oneOf([0, 1], 'Must be 0 or 1'),
  Medication_Use: Yup.number()
    .required('Required')
    .oneOf([0, 1], 'Must be 0 or 1')
});

const initialValues = {
  Age: '',
  Years_in_Mining: '',
  Smoking_History: '',
  Cough_Frequency: '',
  Breathlessness: '',
  Chest_Pain: '',
  Oxygen_Saturation: '',
  Heart_Rate: '',
  Body_Temperature: '',
  Air_Quality_Index: '',
  PM2_5_Level: '',
  CO_Level: '',
  Temperature: '',
  PPE_Usage: '',
  Medication_Use: ''
};

const inputHelp = {
  Smoking_History: '0 = No, 1 = Yes',
  Cough_Frequency: '0 = None, 1 = Occasional, 2 = Frequent',
  Breathlessness: '0 = No, 1 = Yes',
  Chest_Pain: '0 = No, 1 = Yes',
  PPE_Usage: '0 = No, 1 = Yes',
  Medication_Use: '0 = No, 1 = Yes'
};

const DetectionForm = ({ onSubmit }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Convert all values to numbers before sending
      const formattedValues = Object.keys(values).reduce((acc, key) => {
        acc[key] = Number(values[key]);
        return acc;
      }, {});

      await onSubmit(formattedValues);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, values, touched, errors, isSubmitting, isValid }) => (
        <Form className="detection-form">
          <div className="form-grid">
            {Object.keys(initialValues).map((fieldName) => (
              <div className="form-group" key={fieldName}>
                <label htmlFor={fieldName}>
                  {fieldName.replace(/_/g, ' ')}
                  {inputHelp[fieldName] && (
                    <span className="help-text"> ({inputHelp[fieldName]})</span>
                  )}
                </label>
                <Field
                  type="number"
                  step={fieldName.includes('Temperature') || fieldName.includes('Oxygen') ? '0.1' : '1'}
                  name={fieldName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[fieldName]}
                  className={touched[fieldName] && errors[fieldName] ? 'error' : ''}
                />
                {errors[fieldName] && touched[fieldName] && (
                  <div className="error-message">{errors[fieldName]}</div>
                )}
              </div>
            ))}
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? 'Predicting...' : 'Predict Disease'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DetectionForm;
