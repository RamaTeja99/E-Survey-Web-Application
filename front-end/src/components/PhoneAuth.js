import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from './firebaese.js'; // Import firebase

const PhoneAuth = () => {
    const defaultCountryCode = '+91';
    const history = useHistory();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmResult, setConfirmResult] = useState(null);

    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // handleSendCode(); // Do not call handleSendCode here
            }
        });
    }, []);

    const handleSendCode = () => {
        const formattedPhoneNumber = `${defaultCountryCode}${phoneNumber}`;
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(formattedPhoneNumber, appVerifier)
            .then((confirmationResult) => {
                setConfirmResult(confirmationResult);
            })
            .catch((error) => {
                console.log(error);
                setError('Something went wrong');
            });
    };

    const handleVerifyCode = (e) => {
        e.preventDefault();

        // Call handleSendCode function to send verification code
        handleSendCode();

        if (confirmResult) {

            confirmResult.confirm(verificationCode)
                .then((result) => {
                    // User signed in successfully.
                    const user = result.user;
                    console.log(user);

                    // Call your API
                    fetch(`http://localhost:8080/form/getPhoneUserForLogin?phoneNumber=${phoneNumber}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            if (response.status === 404) {
                                alert('No user found. Please register.');
                                // Navigate to register page
                                history.push('/register');
                            } else if (response.status === 200) {
                                // Navigate to dashboard page
                                alert('Login successfully');
                                history.push('/dashboard');

                            }
                        })
                        .catch(error => {
                            // Handle the error
                            console.error('Error:', error);
                        });
                })
                .catch((error) => {
                    setError('Invalid code');
                });
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', padding: '20px' }} onSubmit={handleVerifyCode}>
                <h2>Phone Authentication</h2>
                <input
                    style={{ margin: '10px 0', padding: '10px', width: '200px' }}
                    placeholder="Phone Number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {confirmResult && (
                    <input
                        style={{ margin: '10px 0', padding: '10px', width: '200px' }}
                        placeholder="Verification code"
                        type="number"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                )}
                <button
                    style={{ padding: '10px 20px', margin: '10px 0', cursor: 'pointer' }}
                    type="submit"
                >
                    {confirmResult ? 'Verify Code' : 'Send Code'}
                </button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div style={{ marginTop: '10px' }}>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
                <div id="recaptcha-container"></div>
            </form>
        </div>
    );
};

export default PhoneAuth;


