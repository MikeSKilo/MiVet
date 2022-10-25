import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Card ,Dropdown, Table, Image, } from "react-bootstrap";
import StatRightChart from "./VetDashboardCharts";
import ApexCharts from "../analytics/ApexCharts";
import BestSellingCoursesData from "./BestSellingServicesData";
import ProfileLayout from "./ProfileLayout";
import InvoicesData from "./InvoicesData";
import { useLocation } from "react-router-dom";
import sabioDebug from "sabio-debug";
import PropTypes from "prop-types";
import vetProfilesService from "components/vetProfiles/vetProfilesService";


function VetDashboard(props) {
	const location = useLocation();	
	const _logger = sabioDebug.extend("VetDashboard");
	_logger("props", props);
	_logger("location", location);
	const [vetProfile, setVetProfile] = useState();
	

	//#region chartData
	const [chartData] = useState(
		{
			totalClient: {
				TotalClientChartOptions: {
					height: 'auto',
					labels: [
						'Jan',
						'Feb',
						'March',
						'April',
						'May',
						'Jun',
						'Jul',
						'Aug',
						'Sep',
						'Oct',
						'Nov',
						'Dec'
					],
				},
				TotalClientChartSeries: [{
					name: "Current Month",
					data: [10, 20, 15, 25, 18, 28, 22, 32, 24, 34, 26, 38],
				},],

			},
			newClient: {

				NewClientChartOptions: {
					height: 'auto',
  
					xaxis: { tickPlacement: 'on', },
					chart: {
						toolbar: {
							show: true,
							tools: {
								download: true,
								selection: true,
								zoom: true,
								zoomin: true,
								zoomout: true,
								pan: true,
								reset: true | '<img src="/static/icons/reset.png" width="20">',
								customIcons: []
							}
						},
					},
					labels: [
						'Jan',
						'Feb',
						'March',
						'April',
						'May',
						'Jun',
						'Jul',
						'Aug',
						'Sep',
						'Oct',
						'Nov',
						'Dec'
					],
				},
				NewClientChartSeries: [{ data: [4, 6, 5, 3, 5, 6, 8, 9] }],
			},
			appointment: {
				
				AppointMentsChartOptions: {
					chart: {
						height: 60, type: "line",
						toolbar: { show: !1 },
						sparkline: { enabled: !0 },
						grid: { show: !1, padding: { left: 0, right: 0 } },
    
					},
  
					labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				},
				AppointMentsChartSeries: [{
					name: "Closed",
					type: "column",
					data: [12, 18, 20, 32, 19, 25, 30],
				},
				{
					name: "New",
					type: "line",
					data: [20, 32, 28, 50, 38, 35, 49],
				},],
			}
			
		}
	);
	//#endregion
	

	useEffect(() => {
		vetProfilesService
			.getById(4)
			.then(vetProfileSuccess)
			.catch(vetProfileError)
		
	}, []);

	const vetProfileSuccess = resp => {
		setVetProfile(prevState => {
			return {
				...prevState,
				avatar: resp.item.createdBy.userImage,
				name: `${resp.item.createdBy.firstName} ${resp.item.createdBy.lastName}`,
				email: resp.item.businessEmail,
			}
		})
	};
	const vetProfileError = err => {
		_logger("vetProfileError", err);
	};

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
	));
	CustomToggle.propTypes = {
        children: PropTypes.shape({}),
        onClick: PropTypes.func
	};
	
    const ActionMenu = () => {
        return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}>
                        <i className="fe fe-more-vertical text-muted"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Header>SETTINGS</Dropdown.Header>
                        <Dropdown.Item eventKey="1">
                            <i className="fe fe-edit dropdown-item-icon"></i> Edit
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                            <i className="fe fe-trash dropdown-item-icon"></i> Remove
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    };

	return (<React.Fragment>

		<ProfileLayout vetProfile = {vetProfile}>
			{/* Page Content section */}
			<Row className="justify-content-center">
				<Col className="mb-4 mb-lg-0 ">
					<StatRightChart
						title="Appointments"
						value="10"
						summaryValue="2 Today"
						summaryIcon=""
						isSummaryIconShown="false"
						classValue=""
						chartName="Appointments"
						chartData= {chartData}></StatRightChart>
				</Col>
			</Row>
			{/* <!-- Card --> */}
			<Card className="my-4">
				<Card.Header>
					<h3 className="h4 mb-0">Total Clients</h3>
				</Card.Header>
				<Card.Body>
					<ApexCharts
						options={chartData.totalClient.TotalClientChartOptions}
						series={chartData.totalClient.TotalClientChartSeries}
						height={200}
						type="line"
					/>
				</Card.Body>
			</Card>
        
			{/* <!-- Card --> */}
			<Card className="my-4">
				<Card.Header>
					<h3 className="h4 mb-0">New Clients</h3>
				</Card.Header>
				<Card.Body>
					
					<ApexCharts
						options={chartData.newClient.NewClientChartOptions}
						series={chartData.newClient.NewClientChartSeries}
						height={200}
						type="bar"
					/>
				</Card.Body>
			</Card>
			{/* Invoices card */}
			<Card className="mt-4">
				<Card.Header>
					<h3 className="mb-0 h4">Invoices</h3>
				</Card.Header>
				<Card.Body className="p-0 ">
					<div className="table-responsive border-0 ">
						<Table className="mb-0 text-nowrap ">
							<thead className="table-light">
								<tr>
									<th scope="col" className="border-0">
										Services
									</th>
									<th scope="col" className="border-0">
										HorseName
									</th>
									<th scope="col" className="border-0">
										AMOUNT
									</th>
									<th scope="col" className="border-0">
										Status
									</th>
									<th scope="col" className="border-0"></th>
								</tr>
							</thead>
							<tbody>
								{InvoicesData.map((item, index) => {
									return (
										<tr key={index}>
											<td className="align-middle border-top-0 ">
												<Link to="#">
													<div className="d-lg-flex align-items-center">
														<Image
															src={item.image}
															alt=""
															className="rounded img-4by3-lg"
														/>
														<h5 className="mb-0 ms-lg-3 mt-lg-0 mt-2 text-primary-hover">
															{item.title}
														</h5>
													</div>
												</Link>
											</td>
											<td className="align-middle border-top-0">
												<p>{item.horseName}</p>
											</td>
											<td className="align-middle border-top-0">
												${item.amount}{' '}
											</td>
											<td className="align-middle border-top-0">
												<p>{item.paid}</p>
											</td>
											<td className="align-middle border-top-0">
												<ActionMenu />
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
				</Card.Body>
			</Card>
			{/* <!-- Card --> */}
			<Card className="mt-4">
				<Card.Header>
					<h3 className="mb-0 h4">Best Selling Services</h3>
				</Card.Header>
				<Card.Body className="p-0 ">
					<div className="table-responsive border-0 ">
						<Table className="mb-0 text-nowrap ">
							<thead className="table-light">
								<tr>
									<th scope="col" className="border-0">
										Services
									</th>
									<th scope="col" className="border-0">
										SALES
									</th>
									<th scope="col" className="border-0">
										AMOUNT
									</th>
									<th scope="col" className="border-0"></th>
								</tr>
							</thead>
							<tbody>
								{BestSellingCoursesData.map((item, index) => {
									return (
										<tr key={index}>
											<td className="align-middle border-top-0 ">
												<Link to="#">
													<div className="d-lg-flex align-items-center">
														<Image
															src={item.image}
															alt=""
															className="rounded img-4by3-lg"
														/>
														<h5 className="mb-0 ms-lg-3 mt-lg-0 mt-2 text-primary-hover">
															{item.title}
														</h5>
													</div>
												</Link>
											</td>
											<td className="align-middle border-top-0">
												{item.sales}
											</td>
											<td className="align-middle border-top-0">
												${item.amount}{' '}
											</td>
											<td className="align-middle border-top-0">
												<ActionMenu />
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
				</Card.Body>
			</Card>
		</ProfileLayout>
	</React.Fragment>)

}

export default VetDashboard;