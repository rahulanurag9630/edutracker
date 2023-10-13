import React from 'react';
import { Link } from "react-router-dom";

const loginFormStyle = {
    width: '350px',
    height: '450px',
    margin: '20px auto', // Center the form horizontally
    background: 'white',
    borderRadius: '10px',
    padding: '20px',
  };
  
  const inputStyle = {
    width: '100%', // Make the input boxes full width
    background: 'white',
    border: '2px solid #0db8de',
    borderRadius: '10px',
    marginBottom: '25px',
    color: '#0db8de',
  };
  
  const cardTitleStyle = {
    fontWeight: 'bold',
    paddingTop: '20px',
    fontSize: '28px',
    textAlign: 'center',
  };
  
  const forgotPasswordStyle = {
    float: 'right',
    fontSize: '12px',
    color: '#0db8de',
    textDecoration: 'none',
  };
  
  const signUpStyle = {
    textAlign: 'center',
    paddingTop: '25px',
    color: '#0db8de',
  };
  
  const submitButtonStyle = {
    width: '100%', // Make the submit button full width
    backgroundColor: '#0db8de',
    fontSize: '14px',
    borderRadius: '10px',
    float: 'right',
    transition: 'background-color 0.3s ease', // Add a transition for smoother hover effect
  
    // Hover effect style
    'submitButtonStyle:hover': {
  
      backgroundColor: 'white', // Change the background color on hover
    },
  };

const selectStyle = {
  width: '100%',
  background: 'white',
  border: '2px solid #0db8de',
  borderRadius: '10px',
  marginBottom: '25px',
  color: '#0db8de',
  height: '40px', // Set the height for select input
};

// ... existing styles

export default function Login() {
  return (
    <div className="global-container">
      <div className="card login-form" style={loginFormStyle}>
        <div className="card-body">
          <h1 className="card-title text-denger" style={cardTitleStyle}>
            LOGIN
          </h1>
          <div className="card-text">
            <form>
              {/* Add User Type select field */}
              <div className="form-group">
                <label htmlFor="userType">User Type</label>
                <select
                  id="userType"
                  className="form-control form-control-sm"
                  style={selectStyle}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              {/* Rest of the form */}
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email Address</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  id="exampleInputEmail1"
                  style={inputStyle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <Link to="#" style={forgotPasswordStyle}>
                  Forgot Password?
                  </Link>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  id="exampleInputPassword1"
                  style={inputStyle}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                style={submitButtonStyle}
              >
                Sign In
              </button>
              <div className="signup" style={signUpStyle}>
                Do not have an account? <Link to="#">Create One</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
