/* eslint-disable react/prop-types */
import React, { useState } from "react";
import sabioDebug from "sabio-debug";

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
                        <ul className="list-unstyled">
                            <li className="text-black">John Doe</li>
                            <li className="text-muted mt-1"><span className="text-black">Invoice</span> #12345</li>
                            <li className="text-black mt-1">April 17 2021</li>
                        </ul>
                        <hr />
                        {component}
                       
                    </div>
                    <div className="row text-black">

                        <div className="col-xl-12">
                            <p className="float-end fw-bold">Total: ${sum}
                            </p>
                        </div>
                        <hr />
                    </div>
                   <div className="row text-black">

                        <div className="col-xl-12">
                            <p>Description</p>
                            <p className="fw-bold">{props.data.description}
                            </p>
                        </div>
                        <hr />
                    </div>
                    <div  >
                        <button type='button'className="btn col-2" onClick={props.showForm}>Edit Invoice</button>
                    
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Invoice;