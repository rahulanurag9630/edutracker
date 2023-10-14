import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


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
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({userType: "" , email: "", password: ""});

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit =async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      console.log(response.data);
      if(response.data.userType ==='Teacher')
      {
        navigate('/thome');
        localStorage.setItem("token",response.data.authToken);
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("userType",response.data.userType);
      }
      if(response.data.userType ==='Student')
      {
        navigate('/shome');
        localStorage.setItem("token",response.data.authToken);
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("userType",response.data.userType);
      }
      if(response.data.userType ==='Parent')
      {
        navigate('/phome');
        localStorage.setItem("token",response.data.authToken);
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("userType",response.data.userType);
      }
      
      // Handle success, redirect user, or show a success message
    } catch (error) {
      console.error(error.response.data);
      // Handle error, show error message to the user
    }
  }

  return (
    <div className="global-container">
      <div className="card login-form" style={loginFormStyle}>
        <div className="card-body">
          <h1 className="card-title text-denger" style={cardTitleStyle}>
            LOGIN
          </h1>
          <div className="card-text">
            <form onSubmit={handleSubmit}>
              {/* Add User Type select field */}
              <div className="form-group">
                <label htmlFor="userType">User Type</label>
                <select
                  id="userType"
                  name="userType"
                  className="form-control form-control-sm"
                  style={selectStyle}
                  onChange={onChange}
                  value={credentials.userType}
                >
                  <option value="Teacher">Teacher</option>
                  <option value="Student">Student</option>
                  <option value="Parent">Parent</option>
                  <option value="Admin">Admin</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              {/* Rest of the form */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-sm"
                  id="exampleInputEmail1"
                  style={inputStyle}
                  onChange={onChange}
                  value={credentials.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Link to="#" style={forgotPasswordStyle}>
                  Forgot Password?
                </Link>
                <input
                  type="password"
                  name='password'
                  className="form-control form-control-sm"
                  id="exampleInputPassword1"
                  style={inputStyle}
                  onChange={onChange}
                  value={credentials.password}
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
