import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Payment.css'; // Import the CSS file

// Import the images
import debitCardIcon from './Photos/debit-card-icon.png';
import upiIcon from './Photos/upi-icon.png';
import creditCardIcon from './Photos/credit-card-icon.png';
import paypalIcon from './Photos/paypal-icon.png';

const Payment = () => {
  return (
    <div className="PaymentPage">
      <Button
        component={Link}
        to="/plans"
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        color="primary"
        className="back-button"
      ></Button>
      <div className='container'>
        <h2>Payment Page</h2>
        <p>Select a payment option:</p>
        <div className='PaymentButtons'>
          <button className='PaymentButton'>
            <img src={debitCardIcon} alt="Debit Card" width="24" height="24" />
            Pay with Debit Card
          </button>
          <button className='PaymentButton'>
            <img src={upiIcon} alt="UPI" width="24" height="24" />
            Pay with UPI
          </button>
          <button className='PaymentButton'>
            <img src={creditCardIcon} alt="Credit Card" width="24" height="24" />
            Pay with Credit Card
          </button>
          <button className='PaymentButton'>
            <img src={paypalIcon} alt="PayPal" width="24" height="24" />
            Pay with PayPal
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
