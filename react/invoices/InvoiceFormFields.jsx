import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import PropTypes from "prop-types"
import { Row } from 'react-bootstrap';
import InvoiceTo from './InvoiceTo';
import * as Yup from 'yup'


function InvoiceFormFields(props) {

    const schema = Yup.object().shape({
        services: Yup.array()
            .of(
                Yup.object().shape({
                    name: Yup.string().min(4, 'too short').required('Required'), // these constraints take precedence
                    price: Yup.string().min(2, 'more than $10').required('Required'), // these constraints take precedence
                })
            )
            .required('Must have Services') // these constraints are shown if and only if inner constraints are satisfied
            .min(1, 'Minimum of 1 service'),
        notes: Yup.string()
    })
    const onSubmit = formValues => {
        props.onSubmit(formValues)
    };
  
   
    const addServices = () => (
        <div className='form-group mb-3 card practice-form'>
            <div className=" ms-9 my-7 card-header">

                <div className="row">
                    <div className="col-7">

                        <h1>{props.formTitle}</h1>
                    </div>
                    <div className="col mb-3">
                        <InvoiceTo client={props.client}></InvoiceTo>

                    </div>
                </div>

                <Formik
                    initialValues={props.initialValues}
                    onSubmit={onSubmit}
                    validationSchema={schema}
                >
                    {({ values }) => (
                        <Form>
                            <Row>
                                <div className="col-7">Service Provided</div>
                                <div className="col-2">Price</div>
                            </Row>
                            <FieldArray name="services">
                                {arrayHelpers => (
                                    <div>
                                        {values.services.length > 0 &&
                                            values.services.map((service, index) => (
                                                <div className="row" key={index}>
                                                    <div className="col-7 mb-3">
                                                        <Field
                                                            name={`services.${index}.name`}
                                                            placeholder="Service Name"
                                                            type="text"
                                                            className=" form-control practice-form-control"
                                                        />
                                                        <ErrorMessage
                                                            name={`services.${index}.name`}
                                                            component="div"
                                                            className="field-error text-danger ms-3"     
                                                        />
                                                    </div>
                                                    <div className="col-3 mb-3">
                                                        <div className="input-group">
                                                            <span className="input-group-text">$</span>
                                                            <Field
                                                                name={`services.${index}.price`}
                                                                placeholder="1000"
                                                                type="number"
                                                                className="form-control practice-form-control"
                                                            />
                                                        </div>
                                                        <ErrorMessage
                                                            name={`services.${index}.price`}
                                                            component="div"
                                                            className="field-error text-danger ms-3"
                                                        />

                                                    </div>
                                                    <div className="col" >
                                                        <button
                                                            type="button"
                                                            className="btn btn-warning mb-3 btn-sq-responsive "
                                                            onClick={() => arrayHelpers.remove(index)}
                                                        >
                                                            <span className="fe fe-x"></span>

                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        <button
                                            type="button"
                                            className="btn btn btn-info col-2"
                                            onClick={() => arrayHelpers.push({ name: '', price: '' })}
                                        >
                                            Add Service
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                            <Row >
                                <div className="col-11 mb-3">

                                    <label htmlFor="notes" className="form-label">Notes</label>
                                    <Field as="textarea" className="form-control practice-form-control" id="notes" name="notes" placeholder="optional"></Field>
                                    <ErrorMessage
                                        name="notes"
                                        component="div"
                                        className="has-error ms-3"
                                    />
                                </div>
                            </Row>
                            <div className="col-1 m-2">
                                <button type="submit" className='btn btn-secondary'>Submit</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
    return <React.Fragment>
        
        {props.initialValues && addServices()}

    </React.Fragment>
}

export default InvoiceFormFields

InvoiceFormFields.propTypes = {
    initialValues: PropTypes.shape({
        id: PropTypes.number.isRequired,
        vetId: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        currency: "USD",
        notes: PropTypes.string, //notes are not required
        services: PropTypes.arrayOf({
            name: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
        }).isRequired,
    }
    ),
    formTitle: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    client: PropTypes.shape({
        email: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
    })
};

