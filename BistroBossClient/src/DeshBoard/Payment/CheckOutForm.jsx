import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements(); // Fixed the typo here
  const [error, setError] = useState(""); // Moved useState to the top level

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (stripeError) {
      console.log("You caught the error:", stripeError);
      setError(stripeError.message);
    } else {
      console.log("Payment Method:", paymentMethod);
      setError(""); 
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
      <button
        className="btn btn-primary px-5 mt-4"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default CheckOutForm;
