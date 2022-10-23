import React, { useCallback,useEffect, useRef, useState } from "react";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import Pagination from 'rc-pagination';
import locale from "rc-pagination/lib/locale/en_US";
import {  useNavigate } from 'react-router-dom';
import practiceService from "services/practiceService";
import {   Row, Col,  Button,   } from 'react-bootstrap';
import SinglePracticeCard from "./components/SinglePracticeCard";
import Swal from "sweetalert2";
import 'rc-pagination/assets/index.css';
import "./practice.css";


function Practices(props) {
    const navigate = useNavigate();
    const _logger = debug.extend("PracticesPage");
    const [show, setShow] = useState();
    const refShow = useRef(false);
    const currentUserRef = useRef(props.currentUser);
    const handleShow = () => setShow(true);
    const [state, setState] = useState({
        formData: {},
        practicesComponents: {},
        arrayOfPractices: [],
        pagination: {
            current: 1,
            pageSize: 9,
            total: 0
        }
    });
    useEffect(() => {
        if (currentUserRef.current.isLoggedIn) {
            for (let index = 0; index < currentUserRef.current.roles.length; index++) {
                const element = currentUserRef.current.roles[index];
                _logger("Loggedin UserType", element);
                if (element === "Admin" || element === 'Vet') {
                    refShow.current = true;
                }
            }
        }
    }, []);
    
    useEffect(() => {
        practiceService
            .getAll(state.pagination.current - 1, state.pagination.pageSize)
            .then(getAllSuccess)
            .catch(getAllError) 
    },[]);
    
    const getAllSuccess = resp => {
        handleShow();
        setState(prevState => {
            const pd = { ...prevState };
            pd.arrayOfPractices = resp.item.pagedItems;
            pd.practicesComponents = pd.arrayOfPractices.map(mapper);
           
            pd.pagination.pageSize = resp.item.pageSize;
            pd.pagination.total = resp.item.totalCount;
            return pd;
        });
    };
    const getAllError = err => {
        _logger("getAllError", err);
        
    };
    const removeSuccess = () => {
        Swal.fire(
            'Deleted!',
            'Your Practice has been deleted.',
            'success'
        );
        practiceService
            .getAll(state.pagination.current - 1, state.pagination.pageSize)
            .then(getAllSuccess)
            .catch(getAllError)
    }
    const onDeleteRequest = useCallback((aPractice) => {
        practiceService.remove(aPractice.id)
            .then(removeSuccess)
            .catch(getAllError);
    })
    
    const onEditRequest = useCallback((aPractice) => {
        const fd = {
            Id: aPractice.id,
            name: aPractice.name,
            description: aPractice.description,
            primaryImageId: aPractice.primaryImage[0].id,
            lineOne: aPractice.location.lineOne,
            lineTwo: aPractice.location.lineTwo,
            city: aPractice.location.city,
            zip: aPractice.location.zip,
            stateId: 5,
            latitude: aPractice.location.latitude,
            longitude: aPractice.location.longitude,
            locationTypeId: 3,
            phone: aPractice.phone,
            fax: aPractice.fax,
            businessEmail: aPractice.businessEmail,
            siteUrl: aPractice.siteUrl,
            scheduleId: 10,
        }
        navigate(`/practice/edit/${aPractice.id}`, { state: fd })
    })
   
    
    const mapper = aPractice => {
        const onClickEdit = e => {
            e.preventDefault();
            onEditRequest(aPractice);
        };
        const onClickDelete = e => {
            e.preventDefault();
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    onDeleteRequest(aPractice);
                }
                else {
                    Swal.fire(
                        'Cancelled!',
                        'Your Practice has  not been deleted.',
                        'success'
                    );
                }
            });
        }
        const onClickCard = () => {
            navigate(`/practice/${aPractice.id}`, { state: aPractice })
        }
        return (
            <SinglePracticeCard
                key={`practice-single-card-${aPractice.id}`}
                aPractice={aPractice}
                onClickEdit={onClickEdit}
                onClickDelete={onClickDelete}
                onClickCard={onClickCard}
                show={refShow}>
            </SinglePracticeCard>)
    }
    
    const onChange = page => {
        setState((prevState) => {
            const pd = { ...prevState };
            pd.pagination.current = page;
            return pd;
        })
        practiceService
            .getAll(page - 1, state.pagination.pageSize)
            .then(getAllSuccess)
            .catch(getAllError);
    };
    const onClickNew = () => {
        navigate("/practices/new")
    };

    return <React.Fragment>
                {/* page content start */}
                <div className="page-content" >
            
                    <div className="container p-4">              
                        <Row >
                            <Col lg={12} md={12} sm={12}>
                                <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                                    <div className="mb-3 mb-md-0">
                                        <h1 className="mb-1 h2 fw-bold">Practices</h1>
                                    </div>
                                    
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <div className="d-md-flex align-items-center justify-content-between">
                                    <div>
                                    <Pagination className=" mb-2 page-item " 

                                        onChange={onChange}                      
                                        current={state.pagination.current}
                                        total={state.pagination.total}
                                        pageSize={state.pagination.pageSize} 
                                        locale={locale}
                                        
                                    ></Pagination>

                                    </div>
                                    <div>
                                        {show && refShow.current && <Button className="mb-2 practice-btn" onClick={onClickNew}>Create Practice</Button>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row >               
                            {show && state.practicesComponents}
                        </Row>  
                    </div>
                </div>
                {/* page-content */}
            </React.Fragment>
};


export default Practices


Practices.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number.isRequired,
        roles: PropTypes.arrayOf(PropTypes.string).isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
    }),
    setLoginState: PropTypes.func.isRequired,
};


