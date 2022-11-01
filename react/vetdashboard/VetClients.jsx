import React, { useState } from "react";
import { useEffect } from "react";
import {Card, Row, Col, Button, Table,  } from 'react-bootstrap';
import sabioDebug from "sabio-debug";
import VetDashboardTable from "./VetDashboardTable";
import {getByVetIdByMonth} from "services/appointmentService"
import VetClientsCard from "./VetClientsCard";
import { toast } from "react-toastify";
import PropTypes from "prop-types"

function VetClients({vetId}) {
    const _logger = sabioDebug.extend("VetDashboard-clients");
    const [vetClients , setVetClients] = useState({
		list: [],
        component: [],
    });
    const [listType, setListType] = useState('card');
    _logger(vetClients);
    
    useEffect(() => {
        
		getByVetIdByMonth(vetId , 6)
			.then(vetProfileSuccess)
			.catch(vetProfileError)
	
	}, []);
    const mapper = anAppointment => {
        
        return (
            <VetDashboardTable type="client" data={anAppointment} />
        )
    }
    const mapperV2 = anAppointment => {
        return (
            <Col lg={3} mg={3} className="m-3">
                <VetClientsCard data={anAppointment}></VetClientsCard>
            </Col>     
        )
    }
	const vetProfileSuccess = resp => {
		_logger("vetProfileSuccess", resp);
		setVetClients(prevState => {
			 const pd = { ...prevState };
            pd.list = resp.item.pagedItems;
            pd.component = resp.item.pagedItems.map(mapper);
            pd.component2 = resp.item.pagedItems.map(mapperV2);
            return pd;
		})
		
	};
	const vetProfileError = err => {
		_logger("vetProfileError", err);
        toast.warn("error on getting profile")
    };
    const typeChange = e => {
        setListType(e.target.value);
    }

    return (
            <Card className="border-0">
                <Card.Header>
                    <h3 className="mb-0 h4">Clients</h3>
                </Card.Header>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col lg={4} md={6} className="mb-2 mb-2 mb-lg-0">
                            <select name className="form-select" value={listType} onChange={typeChange}>
                                <option value={''} className="text-muted">Select View Option</option>
                                <option value={'card'} className={"text-dark"}>Card</option>
                                <option value={'table'} className={"text-dark"}>Table</option>
                                
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
                    {listType === 'card' &&
                        (<Row className="align-items-center">
                            {vetClients.component2}

                        </Row>)}
                </Card.Body>
                {listType === 'table' &&
                    (<Card>
                        <div className="table-responsive ">
                            <Table className="text-nowrap">
                                <thead className="table-light " >
                                    <tr className="text-center">
                                        <th scope="col">Email</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Notes</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Date</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {vetClients.component}
                                
                                </tbody>
                            </Table>

                        </div>
                    </Card>)}
            </Card>
       
    )
}

export default VetClients;

VetClients.propTypes = {
    vetId : PropTypes.number.isRequired
}