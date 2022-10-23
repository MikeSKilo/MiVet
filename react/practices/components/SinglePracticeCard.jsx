import React ,{ useRef }from "react";
import sabioDebug from "sabio-debug";
import {  Card, Row, Col, ListGroup,Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import "../practice.css";


function SinglePracticeCard(aPractice) {
    const _logger = sabioDebug.extend("SinglePracticeCard");
    _logger("SinglePracticeCard firing", aPractice);
    const refShow = useRef(aPractice.show.current);
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
            
            <Link
                to=""
                ref={ref}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                    
                }}
            >
                {children}
            </Link>
        
            ))
    CustomToggle.propTypes = {
        children: PropTypes.shape({}),
        onClick: PropTypes.func
    };
    const ActionMenu = () => {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                    
                    <i className="fas fa-list text-muted" aria-hidden="true"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                    <Dropdown.Header>Settings</Dropdown.Header>
                    <Dropdown.Item eventKey="1" onClick={aPractice.onClickEdit}>
                        <i className="fa fa-pencil-square-o dropdown-item-icon" ></i>Edit Details
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={aPractice.onClickDelete}>
                        <i className="fa fa-times dropdown-item-icon"></i>Delete Practice
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    };
    if (aPractice.aPractice) {
        
        return (
            <React.Fragment >
                
                <Col xxl={4} xl={6} lg={6} xs={12} className="mb-4 ">
                    
                    <Card key={`practice-card-${aPractice.aPractice.Id}`} className="h-100 practice-card" >
                        
                        {aPractice.aPractice.primaryImage[0].url !== null ? (
                            <React.Fragment>
                                <Card.Img
                                    variant="top"
                                    src={aPractice.aPractice.primaryImage[0].url}
                                    className="img-fluid rounded-top py-5 practice-card-img-top"
                                />
                                <div className="d-flex position-absolute end-0 pe-2 pt-2">
                                    {refShow.current && <ActionMenu />}
                                </div>
                            </React.Fragment>
                        ) : (
                            ''
                        )}
                        
                        {/* Card body  */}
                        <Card.Body className="practice-card-body ms-3">
                            <div>
                                <h6 className="h4 mb-2 text-wrap ">
                                    <div className="text-inherit ">{aPractice.aPractice.name} </div>
                                </h6>
                            </div>
                            <ListGroup as="ul" bsPrefix="list-inline" className="mb-3">
                                <ListGroup.Item >
                                    <i className="fa fa-home"></i>
                                    <span className="mb-0"> {aPractice.aPractice.location.lineTwo !== null && `${aPractice.aPractice.location.lineOne} ${aPractice.aPractice.location.lineTwo}, ${aPractice.aPractice.location.city}, ${aPractice.aPractice.location.zip}, ${aPractice.aPractice.location.state.name}`} </span>
                                    <span className="mb-0"> {aPractice.aPractice.location.lineTwo ===null && `${aPractice.aPractice.location.lineOne}, ${aPractice.aPractice.location.city}, ${aPractice.aPractice.location.zip}, ${aPractice.aPractice.location.state.name}`} </span>
                                    
                                </ListGroup.Item>
                            </ListGroup>
                                    
                        </Card.Body>
                        {/* Card Footer */}
                        <Card.Footer className="pratice-card-footer">
                            <Row className="d-md-flex align-items-center justify-content-between text-nowrap">
                                <Col className="ms-3">
                                    <Row>
                                        <Col >
                                            <i className="fa fa-phone me-1 text-nowrap" ></i>
                                            <span> {aPractice.aPractice.phone}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <i className="fa fa-fax me-1 text-nowrap"></i>
                                            <span> {aPractice.aPractice.fax}</span>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="ms-3">
                                    <Row>
                                        <button className="btn btn-sm practice-btn-custom text-nowrap practice-btn" onClick={aPractice.onClickCard}>View More</button>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
            </React.Fragment>
        )
    }
    else
        return (
            <h3>No data Available</h3>
        )
}


export default SinglePracticeCard;