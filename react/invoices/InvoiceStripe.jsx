import service from "services/stripeService";
import React from "react";
import toastr from "toastr";

function InvoiceStripe() {

  const onConnectClicked = () => {
    service
      .connectExpress()
      .then(onConnectExpressSuccess)
      .catch(onConnectExpressError);
  };

  const onConnectExpressSuccess = (response) => {

    let url = JSON.stringify(response.item.id);

   
    service
      .expressLink(url)
      .then(onExpressLinkSuccess)
      .catch(onExpressLinkError);
  };

  const onConnectExpressError = (error) => {
   
    toastr.error(error);
  };

  const onExpressLinkSuccess = (response) => {
   
    window.location.href = response.item.url;
  };

  const onExpressLinkError = (error) => {
   
    toastr.error(error);
  };

    return (
        <div >
            <button onClick={onConnectClicked} className="btn btn-primary">
                Connect Stripe
            </button>
       
        </div>
        
    )
}

export default InvoiceStripe