import React, {  useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import sabioDebug from "sabio-debug";
import Swal from "sweetalert2";
import {getById} from "../../services/appointmentService"
import InvoiceFormFields from "./InvoiceFormFields";

    
function InvoiceForm() {
    const _logger = sabioDebug.extend("InvoiceForm")
    const [formTitle] = useState("Invoice #000");
    const [initialValues] = useState({
        id:21,
        vetId: 0,
        customerId: "",
        currency: "USD",
        notes: "",
        services:[{
            name: "",
            price: '',
        }],
       
    }
    );

    const [client, setClient] = useState();
    useEffect(() => {
        //get the client information to render on the invoiceform.
        getById(4)
            .then(getAppointmentSuccess)
            .catch(getAppointmentError)
        
    },[])
 

    const getAppointmentSuccess = resp => {
        _logger("getAppointmentSuccess", resp)
        setClient(resp.item.client)
    }
    const getAppointmentError = err => {
        _logger("getAppointmentError", err)
        toast.warn("Could not get the data")
    }
    
    const onSubmitClicked = e => {
        _logger("onSubmitClicked", e)
        let swalHtml = `<div class='container-fluid'><p class="fw-bold">you have ${e.services.length} services</p><hr/> `
        for (let index = 0; index < e.services.length; index++) {
            const element = e.services[index];
            swalHtml += `<div class='row'>
                        <div class='col m-0 ms-9 text-start'><p>Service: ${element.name}</p></div>
                        <div class= 'col m-0 ms-5 text-start'>Price: $${element.price}</div> </div>`
        }
        swalHtml += '</div>'
        //  will add a service to insert invoice data to the table.  
        Swal.fire({
            title: 'Are you done adding services?',
            html: swalHtml,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Send',
            denyButtonText: `Add more`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Sent!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Not Sent', '', 'info')
            }
        })
         
    }
  

    
    return (
        <div className="container p-4 ">
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Create Invoice</h1>
                        </div>
                    </div>
                </Col>

            </Row>
            <div className="row">
                <div className="col-2">
                    <button className="btn btn-secondary mb-2 ms-4">Go back</button>
                </div>
            </div>
            <InvoiceFormFields  ></InvoiceFormFields>
            <div className="row">
                <Col className="mb-4">
                    <InvoiceFormFields
                        initialValues={initialValues}
                        formTitle={formTitle}
                        onSubmit={onSubmitClicked}
                        client={client}
                    >
    
                    </InvoiceFormFields>
                </Col>
            </div>
        </div>
    )
}

export default InvoiceForm