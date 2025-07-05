'use client';
import React, { useState } from 'react';
import Script from 'next/script';

export default function ManagePaymnet() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (credits) => {
    try {
      setLoading(true);

      const response = await fetch('/api/payments/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credits }), 
      });

      const data = await response.json();
      if (!data.success) {
        alert(data.error || 'Failed to create Razorpay order');
        setLoading(false);
        return;
      }

      const order  = data.data;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: order.amount,
        currency: order.currency,
        name: 'WanderWise',
        description: 'Purchase Credits',
        order_id: order.id, 
        handler: async (response) => {
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
  
            const verifyData = await verifyResponse.json();
            if (!verifyData.success) {
              alert(verifyData.error || 'Payment verification failed');
              setLoading(false);
              return;
            }
  
            alert('Payment Successful!');
            console.log('Payment verified:', verifyData);
          },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#8d1a1a',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-section active w-full max-w-6xl bg-white shadow-lg rounded-xl p-8 mb-8 text-center">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handlePayment(10)}
          disabled={loading}
          className={`btn ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Buy
        </button>
       
      </div>
    </div>
  );
}
