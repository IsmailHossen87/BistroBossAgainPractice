import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();

  const [cart,refetch] = useCart();
  const totalPrice = cart.reduce(
    (total, item) => total + parseInt(item.price),
    0
  );

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

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
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Anonimas",
            name: user?.displayName || "anomimus",
          },
        },
      }
    );
    if (error) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status == "succeeded")
        setTransactionId(paymentIntent.id);
      // NOW SAVE THE PAYMENT IN THE DATABASE

      const payment = {
        user: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        // utc date convert use monent js
        data: new Date(),
        // delete korar jonno id lagbe
        cardId: cart?.map((item) => item._id),
        menuItemId: cart?.map((item) => item.menuId),
        status: "pending",
      };
      const res = await axiosSecure.post("/payment", payment);
      console.log("payment saved", res.data);
      if(res.data?.paymentResult?.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/dashboard/paymentHistory')
      }
      refetch()
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
      {transactionId && (
        <p className="text-green-500">Your transactionId : {transactionId}</p>
      )}
    </form>
  );
};

export default CheckOutForm;
