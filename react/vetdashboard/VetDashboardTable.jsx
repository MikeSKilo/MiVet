
import React from "react";
import { Card, Table } from "react-bootstrap";
import sabioDebug from "sabio-debug";
import PropTypes from "prop-types";

function VetDashboardTable(props) {
    const _logger = sabioDebug.extend("VetDashboard-table");
    if (props) {
        
        _logger("VetDashboardTable props", props);
    
        if (props.type === "invoice") { 
            return (
                <Card.Body className="p-0 pb-4">
                    <div className="table-responsive ">
                        <Table className="text-nowrap">
                            <thead className="table-light">
                                <tr>
                                    <th>Date</th>
                                    <th>Service</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>10/11/2022</td>
                                    <td>Service 1</td>
                                    <td>Pending</td>
                                    <td>$1000</td>
                                </tr>
                                <tr>
                                    <td>10/11/2022</td>
                                    <td>Service 2</td>
                                    <td>Pending</td>
                                    <td>$1000</td>
                                </tr>
                                <tr>
                                    <td>10/11/2022</td>
                                    <td>Service 3</td>
                                    <td>paid</td>
                                    <td>$1000</td>
                                </tr>
                            </tbody>
        
                        </Table>
                    </div>
                </Card.Body>
                
            )
        }
        else if (props.type === 'client') {
            const { data } = props;
            return (
                <tr className="text-center">
                    <td>{data.client.email}</td>
                    <td>{data.client.firstName} {data.client.lastName}</td>
                    <td>{data.notes}</td>
                    <td>{data.location.lineOne}</td>
                    <td>{data.appointmentStart}</td>
                </tr>
                
            )
        }
    }
}


export default VetDashboardTable;

VetDashboardTable.propTypes = {
    type: PropTypes.string,
    data: PropTypes.shape({
        appointmentStart: PropTypes.string,
        notes: PropTypes.string,
        location: PropTypes.shape({ lineOne: PropTypes.string }),
        client: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            id: PropTypes.number,
            email: PropTypes.string
        })
    })
}