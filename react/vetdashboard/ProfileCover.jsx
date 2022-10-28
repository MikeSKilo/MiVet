import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import CheckedMark from 'assets/images/svg/checked-mark.svg';
import PropTypes from "prop-types";
import "./vetdashboard.css"
import sabioDebug from 'sabio-debug';

const ProfileCover = ({ dashboardData }, ) => {
    const _logger = sabioDebug.extend("profileCover")
    _logger(dashboardData)
    if (dashboardData)
    return (
        <Row className="justify-content-center align-items-center">
            <Col xl={10} lg={10} md={10} sm={12}>
                {/* <!-- Bg --> */}
                <div className="pt-16 rounded-top-md profile-cover-bg"></div>
                <div className="d-flex align-items-end justify-content-between bg-white px-4 pt-2 pb-4 rounded-none rounded-bottom-md shadow-sm">
                    <div className="d-flex align-items-center">
                        <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                            <Image
                                src={dashboardData.avatar}
                                className="avatar-xl rounded-circle border border-4 border-white position-relative"
                                alt=""
                            />
                            {dashboardData.verified && (
                                <Link
                                    to="#"
                                    className="position-absolute top-0 end-0"
                                    data-bs-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Verified"
                                >
                                    <Image src={CheckedMark} alt="" height="30" width="30" />
                                </Link>
                            )}
                        </div>
                        <div className="lh-1">
                            <h2 className="mb-0">
                                {dashboardData.name}
                            </h2>
                            <p className="mb-0 d-block">{dashboardData.email}</p>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default ProfileCover;

ProfileCover.propTypes = {
    dashboardData: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        verified: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    
		
    }).isRequired
}