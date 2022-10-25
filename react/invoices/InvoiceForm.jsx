import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import sabioDebug from "sabio-debug";
import * as Yup from "yup";
import Invoice from "./Invoice";
import InvoiceFormInputs from "./InvoiceFormInputs";
import InvoiceSelectors from "./InvoiceSelectors";

function InvoiceForm() {
    const _logger = sabioDebug.extend("InvoiceForm")
    const [formTitle] = useState("Invoice");
    const [formData, setFormData] = useState({
        id:0,
        vetId: 0,
        customerId: "",
        currency: "",
        description: "",
        items:[{
            name: "",
            price: '',
        }]
    }
    );
    const [isDoneAdding, setIsDoneAdding] = useState(false);
    const showForm = () => {
        setIsDoneAdding(false)
    }
   
    

    
    const onSubmitClicked = e => {
        _logger("onSubmitClicked",e)
        //  if (state.AddOrEdit === false) {
        //     _service
        //         .update(e.Id, e)
        //         .then(submitSuccess)
        //         .catch(submitError)
        // }
        // else {
        //     _service
        //         .create(e)
        //         .then(submitSuccess)
        //         .catch(submitError)
        // };
        
    }
    let invoiceSchema = {
            // name: Yup.string().min(2).required("is required"),
            // description: Yup.string().min(10).required("is required"),
            // lineOne: Yup.string().min(10).required("is required"),
            // lineTwo: Yup.string(),
            // city: Yup.string().min(3).required("City name is required"),
            // zip: Yup.string().min(5).required("ZipCode is required"),
            // stateId: Yup.number().required().positive(),
            // latitude: Yup.number().required(),
            // longitude: Yup.number().required(),
            // locationTypeId: Yup.number().required().positive(),
            // phone: Yup.string().min(10).required(),
            // fax: Yup.string().min(10).required(),
            // businessEmail: Yup.string().email().required(),
            // siteUrl: Yup.string().url().required(),
            // scheduleId : Yup.number().required().positive()
    };
    
     const onChangeFormData = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setFormData(prevState => {
            const pd = {
                ...prevState
            }
            pd[name] = value;
            return pd;
        })
    }
    const getItemsData = data => {
        _logger("getItemsData", data)
        const itemsData = data;
        setFormData(prevState => {
            const pd = {
                ...prevState
            }
            pd.items=itemsData
            return pd;
        })
        setIsDoneAdding(true);
    }

    return (
        <div className="container p-4">
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Create Invoice</h1>
                        </div>
                    </div>
                </Col>

            </Row>
            <div className="row">
                <div className="col-2">
                    <button className="btn btn-secondary mb-2">Go back</button>
                </div>
            </div>
            <div className="row">
                <Col className="mb-4">
                    <Formik
                        enableReinitialize={true}
                        initialValues={formData}
                        onSubmit={onSubmitClicked}
                        validationSchema={Yup.object().shape(
                            invoiceSchema
                        )}>
                        <Form>
                            {/* Form Title */}
                            <div className="form-group mb-3 card practice-form">
                                <div className="border-bottom px-4 py-3 card-header">
                                    <h4 className="mb-0">
                                        {formTitle}
                                    </h4>
                                </div>
                                {/* invoice selectors  */}
                                <div className="row">
                                    <div className="col-2 ms-4">

                                        <InvoiceSelectors ></InvoiceSelectors>
                                    </div>
                                </div>
                                
                                
                                <div className="card-body">
                                    <div className="row">
                                        {!isDoneAdding &&
                                            <React.Fragment>
                                                {/* input Fields */}
                                                <InvoiceFormInputs getItemsData={getItemsData} data={formData.items}>
                                                    <Row >
                                                    <div className="col mb-3">

                                                        <label htmlFor="description" className="form-label">Description</label>
                                                        <Field as="textarea" className="form-control practice-form-control" id="description" name="description" onChange={onChangeFormData}></Field>
                                                        <ErrorMessage
                                                            name="description"
                                                            component="div"
                                                            className="has-error"
                                                        />
                                                    </div>
                                                </Row>
                                                </InvoiceFormInputs>
                                                {/* description */}
                                                
                                                
                                            </React.Fragment>}
                                        {/* show summary of the invoice when clicked done. */}
                                        {isDoneAdding && <Invoice data={formData} showForm={showForm}></Invoice>}

                                        {/* submit the data  */}
                                        { isDoneAdding&&(<div className="col-1 m-2">
                                            
                                                <button type="submit" className="btn btn-primary">
                                                    Submit
                                                </button>
                                        </div>)}
                                        
                                            
                                        
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </Col>
            </div>
        </div>
    )
}

export default InvoiceForm