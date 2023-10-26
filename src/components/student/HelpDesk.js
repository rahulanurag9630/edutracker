import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Help.css';
import {useNavigate} from 'react-router-dom'

const HelpDesk = (props) => {
  const  navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the API endpoint with form data
      const response = await axios.post('http://localhost:5000/api/auth/help', {
        name,
        email,
        message,
      });

      // Handle the API response as needed
      console.log('API Response:', response.data);
      props.showAlert("your query is successfully sends to the admin we well back you soon", "success")
      // You can add logic to handle the response, show success message, or redirect the user.

    } catch (error) {
      // Handle API error, if any
      console.error('API Error:', error);
      // You can show an error message to the user.
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      // If user is not logged in, redirect to home page
      navigate('/');
    }
  }, [navigate]);

  // If user is not authenticated, do not render the component
  if (!isLoggedIn) {
    return null;
  }
else{
  return (
    <div className="help-desk-form" style={{ backgroundColor: '#ECDBBA', marginTop: '5vh' }}>
      <h2 className="help-desk">Contact Help Desk</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>

      </form>
    </div>
  );
};
}

export default HelpDesk;
