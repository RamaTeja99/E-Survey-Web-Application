import React from 'react';
import { Link , useHistory} from 'react-router-dom';



const Plans = () => {
  const history = useHistory();
  const handleUpgradeClick = () => {
    history.push('/payment');
  };
  const plansFormStyle = {
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    boxShadow: '0 15px 25px rgba(0, 0, 0, 0.6)',
    padding: '40px',
    width: '500px',
    display: 'flex',
    flexDirection: 'column', // Change to 'column' to center-align content vertically
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    justifyContent: 'center', // Center horizontally
    height: '70vh',
    margin: '0 auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const basicPlanStyle = {
    background: 'linear-gradient(0deg, #1f1c14 0%, #8e8585 100%)',
    padding: '10px',
    margin: '10px',
    height: '40vh',
    width: '400px',
    flexDirection: 'column', // Center-align content vertically
  };

  const premiumPlanStyle = {
    background: 'linear-gradient(0deg, #1f1600 0%, #d0cc53 100%)',
    padding: '10px',
    margin: '20px',
    height: '40vh',
    width: '400px',
    flexDirection: 'column', // Center-align content vertically
  };

  return (
    <div style={plansFormStyle} className='PlansForm'>
      <h2>Subscription</h2>
      <div style={basicPlanStyle}>
        <h2>Basic Plan</h2>
        <p>It is a free plan.</p>
        <p>INR ₹0</p>
        <Link to="/dashboard">
          <button>Continue</button>
        </Link>
      </div>

      <div style={premiumPlanStyle}>
        <h2>Premium Plan</h2>
        <p>Has an upgrade.</p>
        <p>INR ₹500/month</p>
        <button onClick={handleUpgradeClick}>Upgrade</button>
      </div>
    </div>
  );
}

export default Plans;
