import React from "react";
import { Row,Col, Card, Table, Image} from "react-bootstrap";
import StatRightChart from "./VetDashboardCharts";
import ApexCharts from "../analytics/ApexCharts";
import InvoicesData from "./invoicesData";
import { Link } from "react-router-dom";
import ActionMenu from "./ActionMenu";
import BestSellingServicesData from "./bestSellingServicesData";
import { chartData } from "./vetDashboardMainData";


function VetDashboardMain() {
    const bestSellingMapper = (item, index) => {
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
    };
    const invoiceMapper = (item, index) => {
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
    };
    return (
        <React.Fragment>

        
            <Row className="justify-content-center">
                <Col className="mb-4 mb-lg-0 ">
                    <StatRightChart
                        title="Appointments"
                        value="10"
                        summaryValue="2 Today"
                        summaryIcon=""
                        isSummaryIconShown={false}
                        classValue=""
                        chartName="Appointments"
                        chartData={chartData}></StatRightChart>
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
                                {InvoicesData.map(invoiceMapper)}
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
                                {BestSellingServicesData.map(bestSellingMapper)}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}

export default VetDashboardMain