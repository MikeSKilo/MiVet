import { Formik, Form, Field , ErrorMessage} from "formik";
import React from "react";
import { useState , useEffect} from "react";
import * as Yup from "yup";
import debug from "sabio-debug";
import practiceService from "services/practiceService";
import { useNavigate, useLocation  } from "react-router-dom";
import PropTypes from "prop-types";
import { Col , Row} from "react-bootstrap";
import "../../fileUpload/fileupload.css";
import "../practice.css";
import LocationForm from "../../location/LocationForm";
import FileUpload from "components/fileUpload/FileUpload";
import Swal from "sweetalert2";

function PracticeForm() {
    const _logger = debug.extend("Practices")
    const navigate = useNavigate();
    const location = useLocation();
    _logger("location", location);
    
    
    const [state, setState] = useState({
        formTitle: "Add a New Practice",
        AddOrEdit: true,
        imageDone: false
    });

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        primaryImageId: 0,
        locationId: 0,
        lineOne: "",
        lineTwo: "optional",
        city: "",
        zip: "",
        stateId: 5,
        latitude: 0,
        longitude: 0,
        locationTypeId: 3,
        phone: "",
        fax: "",
        businessEmail: "",
        siteUrl: "",
        scheduleId: 10,
        vetProfileIds: [4, 7],
        
    });

    const getImageDate = resp => {
        _logger("getImageDate", resp);
        const image = resp[0]
        setFormData(prevState => {
            return {
                ...prevState,
                primaryImageId: image.id,
                primaryImageUrl: image.url
            };
        });
        setState(prevState => {
            return {
                ...prevState,
                imageDone: true,
            };
        });
        
    };

    const getLocationData = resp => {
        _logger("getLocationData", resp);
        setFormData(prevState => {
            return {
                ...prevState,
                city: resp.city,
                latitude: resp.latitude,
                longitude: resp.longitude,
                lineTwo: resp.lineTwo,
                lineOne: resp.lineOne,
                stateId: resp.stateId,
                zip: resp.zip
            };
        });
        _logger("getLocationData", formData);

    };

    const imageDone = () => {

        return (<React.Fragment>
            
            <span className="mb-3">Image Id : {formData.primaryImageId}</span>
            <span className="mb-3"><img className="practice-img-uploaded" src={formData.primaryImageUrl} alt="uploaded img"></img></span>
        </React.Fragment>)
    };
    useEffect(() => {
        if (location.state) {
            
                
            setState(prevState => {
                return {
                    ...prevState,
                    formTitle: `Edit ${location.state.name} Id: ${location.state.Id}`,
                    AddOrEdit: false
                }
            });
            setFormData(prevState => {
                return {
                    ...prevState,
                    ...location.state,
                    primaryImageType:3,
                            
                };
            });
        };   
    }, []);
   
    let practiceSchema = {
            name: Yup.string().min(2).required("is required"),
            description: Yup.string().min(10).required("is required"),
            lineOne: Yup.string().min(10).required("is required"),
            lineTwo: Yup.string(),
            city: Yup.string().min(3).required("City name is required"),
            zip: Yup.string().min(5).required("ZipCode is required"),
            stateId: Yup.number().required().positive(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            locationTypeId: Yup.number().required().positive(),
            phone: Yup.string().min(10).required(),
            fax: Yup.string().min(10).required(),
            businessEmail: Yup.string().email().required(),
            siteUrl: Yup.string().url().required(),
            scheduleId : Yup.number().required().positive()
            };

    const _service = practiceService;

    const onSubmitClicked = e => {
        _logger(e);
        if (state.AddOrEdit === false) {
            _service
                .update(e.Id, e)
                .then(submitSuccess)
                .catch(submitError)
        }
        else {
            _service
                .create(e)
                .then(submitSuccess)
                .catch(submitError)
        };
    };

    const submitSuccess = resp => {
        _logger("submitSuccess", resp);
        if (state.AddOrEdit === false)
        {
            Swal.fire("Practice edited")
        }
        else {
            Swal.fire("Practice added")

        }
        navigate("/practices/")
    };

    const submitError = err => {
        _logger("submitError", err);
        Swal.fire("Failed to add a Practice")
    };

    const onClickGoBack = () => {
        
        navigate("/practices")
    };

    const onChangeFormData = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setFormData((prevState) => {
            const updatedFormData = {
                ...prevState,
            };
            updatedFormData[name] = value;
            return updatedFormData;
        });
    };

    return <React.Fragment>
        
        <div className="container p-4">
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Practices</h1>
                        </div>
                    </div>
                </Col>

            </Row>
            <div className="row">
                <div className="col-2">
                    <button className = "btn btn-secondary mb-2"onClick={onClickGoBack}>Go back</button> 
                </div>
            </div>
            <div className="row">
                <Col className="mb-4">                    
                    <Formik
                        enableReinitialize={true}
                        initialValues={formData}
                        onSubmit={onSubmitClicked}
                        validationSchema={Yup.object().shape(
                            practiceSchema
                        )}>                       
                        <Form>
                            {/* Form Title */}     
                            <div className="form-group mb-3 card practice-form">
                                <div className="border-bottom px-4 py-3 card-header">
                                    <h4 className="mb-0">
                                        {state.formTitle}
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <Row>                                           
                                            <div className="col mb-3">
                                                <label htmlFor="name" className="form-label">Name</label>
                                                <Field type="text" className="form-control practice-form-control" id="name" name="name" onChange={onChangeFormData}></Field>
                                                <ErrorMessage
                                                    name="name"
                                                    component="div"
                                                    className="has-error"                                                  
                                                />
                                            </div>
                                                {/* image data */} 
                                            <div className="col mb-3">
                                                {state.imageDone && imageDone()}    
                                                {!state.imageDone && <FileUpload name="imageFile" onUploadSuccess={getImageDate}></FileUpload>}
                                            </div>

                                        </Row>                               
                                        <Row>                                                   
                                            {/* location data */}
                                            <div className="col mb-3">
                                                <LocationForm onClick = {getLocationData} formData={formData}></LocationForm>          
                                            </div>
                                        </Row>  
                                        <Row>
                                            
                                            <div className="col mb-3">

                                                <label htmlFor="phone" className="form-label">phone</label>
                                                    <Field type="text" className="form-control" id="phone" name="phone" onChange={onChangeFormData}></Field>
                                                    <ErrorMessage
                                                        name="phone"
                                                        component="div"
                                                        className="has-error"
                                                        
                                                    />
                                            </div>
                                            <div className="col mb-3">

                                                <label htmlFor="fax" className="form-label">fax</label>
                                                <Field type="text" className="form-control practice-form-control" id="fax" name="fax" onChange={onChangeFormData}></Field>
                                                <ErrorMessage
                                                    name="fax"
                                                    component="div"
                                                    className="has-error"
                                                    
                                                />
                                            </div>
                                            
                                        </Row>
                                        <Row>

                                            <div className="col mb-3">

                                                <label htmlFor="businessEmail" className="form-label">businessEmail</label>
                                                <Field type="email" className="form-control practice-form-control" id="businessEmail" name="businessEmail" onChange={onChangeFormData}></Field>
                                                <ErrorMessage
                                                    name="businessEmail"
                                                    component="div"
                                                    className="has-error"
                                                    
                                                />
                                            </div>
                                            <div className="col mb-3">

                                                <label htmlFor="siteUrl" className="form-label">siteUrl</label>
                                                <Field type="text" className="form-control practice-form-control" id="siteUrl" name="siteUrl" onChange={onChangeFormData}></Field>
                                                <ErrorMessage
                                                    name="siteUrl"
                                                    component="div"
                                                    className="has-error"
                                                    
                                                />
                                            </div>
                                        </Row>
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
                                        <Row>
                                            <Col xs={12}>
                                                <button  type="submit" className="practice-btn btn btn-primary practice-btn-primary m-2">
                                                    Submit
                                                </button>
                                            </Col>
                                        </Row>                    
                                    </div>                  
                                </div>
                            </div>
                        </Form>    
                    </Formik>   
                </Col>
            </div>
        </div>

    </React.Fragment>
};


export default PracticeForm;


PracticeForm.propTypes = {
    onClick : PropTypes.func
}