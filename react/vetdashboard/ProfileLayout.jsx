import React, { Fragment, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Container, Nav, Navbar } from 'react-bootstrap';
import sabioDebug from 'sabio-debug';
import ProfileCover from './ProfileCover';
import {DashboardMenu, AccountSettingsMenu} from './VetProfileDashboard';
import vetProfilesService from '../../vetProfiles/vetProfilesService'
import { useState } from 'react';


const ProfileLayout = (props) => {
	const location = useLocation();
	const _logger = sabioDebug.extend("VetDashboard Profile Layout");
	useEffect(() => {
		document.body.style.backgroundColor = '#f5f4f8';

	});
	const [vetProfile , setVetProfile] = useState({
		
	});
	_logger("ProfileLayout props", props)
	
	useEffect(() => {
		_logger("useEffect activating");
		
		vetProfilesService
			.getById(7)
			.then(vetProfileSuccess)
			.catch(vetProfileError)
	
	}, []);

	const vetProfileSuccess = resp => {
		_logger("vetProfileSuccess", resp);
		setVetProfile(prevState => {
			return {
				...prevState,
				avatar: resp.item.createdBy.userImage,
				name: `${resp.item.createdBy.firstName} ${resp.item.createdBy.lastName}`,
				email: resp.item.businessEmail,
				id: resp.item.id
				
			}
		})
		
	};
	const vetProfileError = err => {
		_logger("vetProfileError", err);

	};

	return (
		<Fragment>
			<div className="pt-5 pb-5">
				<Container fluid >
					{/* User info */}
					<ProfileCover dashboardData={vetProfile} />

					{/* Content */}
					<Row className="mt-0 mt-md-4 justify-content-center">
						<Col lg={2} md={3} sm={12}>
							<Navbar
								expand="lg"
								className="navbar navbar-expand-md navbar-light shadow-sm mb-4 mb-lg-0 sidenav"
							>
								<Link
									className="d-xl-none d-lg-none d-md-none text-inherit fw-bold fs-5 float-start py-1"
									to="#"
								>
									Menu
								</Link>
								<Navbar.Toggle
									aria-controls="basic-navbar-nav"
									className="p-0 focus-none border-0"
									label="Responsive Menu"
								>
									<span
										className="navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary p-0 text-white float-end"
										data-bs-toggle="collapse"
										data-bs-target="#sidenav"
										aria-controls="sidenav"
										aria-expanded="false"
										aria-label="Toggle navigation"
									>
										<span className="fe fe-menu"></span>
									</span>
								</Navbar.Toggle>

								<Navbar.Collapse id="basic-navbar-nav">
									<Nav className="me-auto flex-column" as="ul">
										<Nav.Item className="navbar-header" as="li">
											Dashboard
										</Nav.Item>
										{DashboardMenu.map((item, index) => (
											<Nav.Item
												as="li"
												key={index}
												className={`${
													item.link === location.pathname ? 'active' : ''
												}`}
											>
												<Link className="nav-link" to={item.link}>
													<i className={`fe fe-${item.icon} nav-icon`}></i>
													{item.title}
												</Link>
											</Nav.Item>
										))}
										<Nav.Item className="navbar-header mt-4" as="li">
											ACCOUNT SETTINGS
										</Nav.Item>
										{AccountSettingsMenu.map((item, index) => (
											<Nav.Item
												as="li"
												key={index}
												className={`${
													item.link === location.pathname ? 'active' : ''
												}`}
											>
												<Link className="nav-link" to={item.link}>
													<i className={`fe fe-${item.icon} nav-icon`}></i>
													{item.title}
												</Link>
											</Nav.Item>
										))}
									</Nav>
								</Navbar.Collapse>
							</Navbar>
						</Col>

                        <Col lg={8} md={7} sm={12}>
                            
							{/* eslint-disable-next-line react/prop-types */}
							{props.children}
						</Col>
					</Row>
				</Container>
			</div>
		</Fragment>
	);
};
export default React.memo(ProfileLayout);
