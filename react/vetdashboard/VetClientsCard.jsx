import React from "react";
import { Card, } from "react-bootstrap";
import sabioDebug from "sabio-debug";
import PropTypes from "prop-types";

//sdfssdfsdfsdfsdf

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