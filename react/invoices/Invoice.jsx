
import React, { useState } from "react";
import sabioDebug from "sabio-debug";
import PropTypes from "prop-types"

function Invoice(props) {
    const _logger = sabioDebug.extend("Invoice")
    _logger("Invoice")
    _logger(props);
    const [invoiceData] = useState(
        {
            ...props.data,
            list: props.data.items,
        }
    );
    let sum = 0;
    for (let index = 0; index < invoiceData.list.length; index++) {
        const element = parseInt(invoiceData.list[index].price);
        _logger("total", element);
        sum = element + sum
    }
    _logger("sum", sum);
        
    
    const mapper = (item, index) => {

        return (

            <div className="row" key={`invoice-${index}`}>
                <div className="col-xl-10">
                    <p>{item.name}</p>
                </div>
                <div className="col-xl-2">
                    <p className="float-end">${item.price}
                    </p>
                </div>
                <hr />
            </div>
        )
    }
    const component = invoiceData.list.map(mapper);
    return (
        <div className="card">
            <div className="card-body mx-4">
                <div className="container">
                    <p className="my-5 mx-5" >Invoice Summary</p>
                    <div className="row">
                        <hr />
                        {component}
                    </div>
                    <div className="row text-black">
                        <div className="col-xl-12">
                            <p
                                className="float-end fw-bold">
                                Total: ${sum}
                            </p>
                        </div>
                        <hr/>
                    </div>
                   <div className="row text-black">
                        <div className="col-xl-12">
                            <p>
                                Notes
                            </p>
                            <p className="fw-bold">
                                {props.data.description}
                            </p>
                        </div>
                        <hr />
                    </div>
                    <div  >
                        <button
                            type='button'
                            className="btn col-2"
                            onClick={props.showForm}>
                            Edit Invoice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Invoice;

Invoice.propTypes = {
    data: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired
    })).isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    showForm: PropTypes.func.isRequired,
    client: PropTypes.shape({
        lastName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    })
}