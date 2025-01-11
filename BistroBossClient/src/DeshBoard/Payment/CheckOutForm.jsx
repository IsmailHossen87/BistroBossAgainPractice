import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";

const CheckOutForm = () => {
  const {user} = useAuth() 
  const stripe = useStripe();
  const elements = useElements(); 
  const [error, setError] = useState(""); 
  const [transactionId,setTransactionId]=useState('')
  const [clientSecret,setClientSecret]= useState('')
  const axiosSecure = useAxiosSecure()


  const [cart] = useCart()
  const totalPrice = cart.reduce((total, item) => total + parseInt(item.price), 0);

  useEffect(()=>{
    console.log(totalPrice)
    axiosSecure.post('/create-payment-intent',{price:totalPrice})
   .then(res => {
    setClientSecret(res.data.clientSecret)
   })
  },[axiosSecure,totalPrice])




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
// *********************** card element ta koi theke 
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



    // confirm payment
    const {paymentIntent,error}=await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:card,
        billing_details:{
          email:user?.email || 'Anonimas',
          name:user?.displayName || "anomimus"
        }
      }
    })
    if(error){
      console.log("confirm error")
    }else{
      console.log("payment intent",paymentIntent)
      if(paymentIntent.status == "succeeded")
        setTransactionId(paymentIntent.id)
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
      {transactionId && <p className="text-green-500">Your transactionId : {transactionId}</p>}
    </form>
  );
};

export default CheckOutForm;
