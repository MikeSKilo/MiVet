import React from "react";
import sabioDebug from "sabio-debug";
import PropTypes from "prop-types";

function InvoiceTo({client}) {
    const _logger = sabioDebug.extend("InvoiceTo")
    _logger("invoiceTo Props" , client)
    if (client) {

    return <React.Fragment>
        <div className="container ps-0">
            <div className="row">
                <div className="col">
                    <h4 className="mb-0">Invoice To</h4>
                    <p className="mb-0">{client.firstName} {client.lastName}</p>
                    <p className="mb-0">{client.email}</p>
                </div>
            </div>
        </div>
        </React.Fragment>
    }
    else {
        <div className="container">
            <div className="row">
                <div>
                    <h4 className="mb-0">Invoice To</h4>
                    <p className="mb-0">No client Data Available</p>
                    <p className="mb-0"></p>
                </div>
            </div>
        </div>
    }
}

export default InvoiceTo

InvoiceTo.propTypes = {
    client: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    })
}