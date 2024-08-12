import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Button, Form as BootstrapForm } from 'react-bootstrap';
import '../style/cardstyle.css';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().when('step', {
      is: 1,
      then: Yup.string().required('Name is required'),
    }),
    address: Yup.string().when('step', {
      is: 2,
      then: Yup.string().required('Address is required'),
    }),
    payment: Yup.string().when('step', {
      is: 3,
      then: Yup.string().required('Payment method is required'),
    }),
  });

  const handleStepChange = (values, { validateForm }) => {
    // Validate the form
    validateForm().then(errors => {
      if (Object.keys(errors).length === 0) {
        if (step < 3) {
          setStep(step + 1);
        } else {
          console.log('Submit form:', values);
          setIsSubmitted(true);
        }
      } else {
        // If there are errors, do not advance to the next step
        console.log('Validation errors:', errors);
      }
    }).catch(error => {
      console.error('Error during validation:', error);
    });
  };

  if (isSubmitted) {
    return (
      <div className="container-fluid py-5 bg-info" id='container'>
        <Row>
          <Col>
            <h2 className='text-center text-warning'>Thank you for shopping!</h2>
            <p className='text-center text-success lead'>Your parcel is on the way.</p>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5 bg-info" id='container'>
      <Row>
        <Col>
          <h2 className='text-info bg-warning text-center'>Checkout</h2>
          <Formik
            initialValues={{ name: '', address: '', payment: '' }}
            validationSchema={validationSchema}
            onSubmit={handleStepChange}
          >
            {({ values, setFieldValue, validateForm }) => (
              <Form>
                {step === 1 && (
                  <div>
                    <div className="mb-3">
                      <label htmlFor="name">Name</label>
                      <Field name="name" type="text" className="form-control"/>
                      <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>
                    <Button 
                      type="button" 
                      onClick={() => validateForm().then(() => handleStepChange(values, { validateForm }))}
                    >
                      Next
                    </Button>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <div className="mb-3">
                      <label htmlFor="address">Address</label>
                      <Field name="address" type="text" className="form-control" />
                      <ErrorMessage name="address" component="div" className="text-danger" />
                    </div>
                    <Button className='button-spacing' type="button" onClick={() => setStep(step - 1)}>
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => validateForm().then(() => handleStepChange(values, { validateForm }))}
                    >
                      Next
                    </Button>
                  </div>
                )}
                {step === 3 && (
                  <div>
                    <div className="mb-3">
                      <label>Payment Method</label>
                      <div>
                        <BootstrapForm.Check
                          type="radio"
                          label="Cash on Delivery"
                          value="cod"
                          checked={values.payment === 'cod'}
                          onChange={() => setFieldValue('payment', 'cod')}
                        />
                        <BootstrapForm.Check
                          type="radio"
                          label="Bank Transfer"
                          value="banktransfer"
                          checked={values.payment === 'banktransfer'}
                          onChange={() => setFieldValue('payment', 'banktransfer')}
                        />
                        <BootstrapForm.Check
                          type="radio"
                          label="Other"
                          value="other"
                          checked={values.payment === 'other'}
                          onChange={() => setFieldValue('payment', 'other')}
                        />
                        <ErrorMessage name="payment" component="div" className="text-danger" />
                      </div>
                    </div>
                    <Button className='button-spacing' type="button" onClick={() => setStep(step - 1)}>
                      Back
                    </Button>
                    <Button 
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
