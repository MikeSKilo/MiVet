import React from "react";
import {Card, Row, Col, Button, } from 'react-bootstrap';
import VetDashboardTable from "./VetDashboardTable";


function VetInvoices() {

  
    return (
        <React.Fragment>
            <Card className="border-0 mt-4">
                <Card.Header>
                    <h3 className="mb-0 h4">Invoices</h3>
                </Card.Header>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col lg={3} md={6} className="pe-md-0 mb-2 mb-lg-0">
                            <select name className="form-select" defaultValue={0}>
                                <option value={0} className="text-muted">Select Option</option>
                                <option value={30} className={"text-dark"}>Due</option>
                                <option value={60} className={"text-dark"}>Last 10 Invoices</option>
                                <option value={180} className={"text-dark"}>Paid 10 Invoices</option>
                            </select>
                        </Col>
                        <Col lg={4} md={6} className="mb-2 mb-2 mb-lg-0">
                            <select name className="form-select" defaultValue={0}>
                                <option value={0} className="text-muted">Select Option</option>
                                <option value={1} className={"text-dark"}>Type 1 </option>
                                <option value={2} className={"text-dark"}>Type 2</option>
                                <option value={3} className={"text-dark"}>Type 3</option>
                            </select>
                        </Col>
                        <Col lg={2} md={6} className="text-lg-end">
                            <Button
                                variant="link"
                                href="#"
                                download=""
                                className="btn-outline-white"
                            >
                                <i className="fe fe-download"></i>
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
                <Card>
                    <VetDashboardTable type="invoice"/>

                </Card>

            </Card>
        </React.Fragment>
    );
}

export default VetInvoices;