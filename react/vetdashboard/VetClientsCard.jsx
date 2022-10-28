import React from "react";
import { Card, } from "react-bootstrap";
import sabioDebug from "sabio-debug";
import PropTypes from "prop-types";


function VetClientsCard(props) {
    const _logger = sabioDebug.extend("VetClientCard")
    _logger("VetClientsCard Firing with props" , props);
    const { data } = props;

    
    return (
        <Card >
            <Card.Body className="text-center">
                <Card.Title >{data.client.firstName} {data.client.lastName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted ">{data.client.email}</Card.Subtitle>
                <Card.Text >
                    {data.notes}
                </Card.Text>
                <Card.Link href="#" className="text-center">Message</Card.Link>
                <Card.Link href="#" className="text-center">Email</Card.Link>
            </Card.Body>
        </Card>
    )
}


export default VetClientsCard;

VetClientsCard.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.shape({
        appointmentStart: PropTypes.string.isRequired,
        notes: PropTypes.string.isRequired,
        location: PropTypes.shape({ lineOne: PropTypes.string }).isRequired,
        client: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            email: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
}