import React, {} from 'react'
import { PaystackConsumer } from 'react-paystack';

const Paystack = (props: any) => {
  const {amount, userEmail ,parseSuccess, parseFailed} = props

    const config: any = {
        reference: (new Date()).getTime().toString(),
        email: userEmail || "user@example.com",
        amount: amount || 0, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_test_dsdfghuytfd2345678gvxxxxxxxxxx',
    };
    
    // you can call this function anything
    const handleSuccess = (reference: any) => {
      // Implementation for whatever you want to do with reference and after success call.
      parseSuccess(reference);
      console.log(reference);
    };
  
    // you can call this function anything
    const handleClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      parseFailed('closed');
      console.log('closed')
    }

    const componentProps = {
      ...config,
      text: 'Paystack Button Implementation',
      onSuccess: (reference: any) => handleSuccess(reference),
      onClose: handleClose
  };

  return (
    <PaystackConsumer {...componentProps} >
      {({initializePayment}) => <button onClick={() => initializePayment(handleSuccess, handleClose)}>Paystack Consumer Implementation</button>}
    </PaystackConsumer>
  )
}

export default Paystack;