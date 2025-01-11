import React from 'react';
import SectionTitle from '../../Shared/SectionTitle';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';

// TO DO
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT)
const Payment = () => {
    return (
        <div>
            <SectionTitle subHeading='Payment ' heading='Please Pay to eat'/>

             
            <div className='w-3/5 mx-auto '>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;