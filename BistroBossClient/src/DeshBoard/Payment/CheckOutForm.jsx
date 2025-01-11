import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";




const CheckOutForm = () => {
const stripe = useStripe()
const elemnts = useElements()


const handleSubmit = (e) => {
  e.preventDefault();
  if(!stripe || !elemnts){
    return
  }
  const card = elemnts.getElement(CardElement)
  if(card == null){
    return 
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
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckOutForm;
