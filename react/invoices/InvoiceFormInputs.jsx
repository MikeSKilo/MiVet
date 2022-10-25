/* eslint-disable react/prop-types */
import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import sabioDebug from "sabio-debug";


function InvoiceFormInputs(props) {
    const _logger = sabioDebug.extend("InvoiceFormInputs")
    _logger("props",props)
    const [inputFields,setInputFields] = useState(props.data);
    const handleInputChange = (index, event) => {
        
        let data = [...inputFields];
        _logger("data",data)
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };
    const addFields = () => {
        let object = {
            name: '',
            price: ''
        };
        setInputFields([...inputFields, object])
    }
    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    };

    const inputComponent = (
        inputFields.map(
            (input, index) => {
                return (
                    <Row key={index}>
                        <div className="col-7 mb-3">

                            <div className="input-group">
                                <Field type="text" className=" form-control practice-form-control" name="name" placeholder="Enter service provided" value={input.name} onChange={event => handleInputChange(index, event)}></Field>
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="has-error"
                                />
                            </div>
                        </div>
                        <div className="col-3 mb-3">

                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <Field type="number" className="form-control practice-form-control" name="price" placeholder="1000" value={input.price} onChange={event => handleInputChange(index, event)}></Field>
                                <ErrorMessage
                                    name="price"
                                    component="div"
                                    className="has-error"
                                />
                            </div>
                        </div>
                        <button className="btn btn-warning col-2 mb-3" onClick={() => removeFields(index)}>Remove</button>
                    </Row>
                )
            }
        )
    )
    const sendData = () => {
        props.getItemsData(inputFields)
    }
   
    return (
        <React.Fragment>
            {/* {component here} */}
            <Row>
                <div className="col-8">Service Provided</div>
                <div className="col-2">Price</div>
            </Row>
            {inputComponent}
            <div className="m-2">
                <button type="button" className="btn btn btn-info col-2" onClick={addFields}>Add More..</button>
            </div>
            <br />
            {props.children}
            <div className="col-1 m-2">
                <button type="button" className="btn btn-secondary " onClick={sendData}>Preview</button>
            </div>
        </React.Fragment>
    )
}

export default InvoiceFormInputs;