import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CheckOutForm = () => {
    const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!stripe || !elements){
        return
    }
    const card = elements.getElement(CardElement);

    if(card === null){
        return
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card
    })

    if(error){
        console.log('payment error',error);
        setError(error.message)
    }
    else{
        console.log('payment method',paymentMethod);
        setError('')
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button type="submit" className="btn btn-sm bg-blue-950 text-[#fff]" disabled={!stripe}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
    </form>
  );
};

export default CheckOutForm;
