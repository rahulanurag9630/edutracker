import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import student from '../../assets/student.css';

function ParentReg() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    gender: 'Male', // Default gender value
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/createParent', formData);
      console.log(response.data);
      navigate('/ahome');
      // Handle success, redirect user, or show a success message
    } catch (error) {
      console.error(error.response.data);
      // Handle error, show error message to the user
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
  else {

    return (
      <div className="container mt-3" style={{ backgroundColor: '#ECDBBA', marginTop: '5vh' }}>
        <form onSubmit={handleSubmit}>
          <div className="row jumbotron box8">
            <div className="col-sm-12 mx-t3 mb-4">
              <h2 className="text-center text-info">Parent Registration Form</h2>
            </div>
            <div className="col-sm-6 form-group">
              <label for="firstName">First Name</label>
              <input type="text" className="form-control" name="firstName" id="firstName" placeholder="Enter your first name." onChange={handleChange} required />
            </div>
            <div className="col-sm-6 form-group">
              <label for="lastName">Last Name</label>
              <input type="text" className="form-control" name="lastName" id="lastName" placeholder="Enter your last name." onChange={handleChange} required />
            </div>
            <div className="col-sm-6 form-group">
              <label for="email">Email</label>
              <input type="email" className="form-control" name="email" id="email" placeholder="Enter your email." onChange={handleChange} required />
            </div>
            <div className="col-sm-4 form-group">
              <label for="contactNumber">Contact Number</label>
              <input type="tel" name="contactNumber" className="form-control" id="contactNumber" placeholder="Enter Your Contact Number." onChange={handleChange} required />
            </div>
            <div className="col-sm-6 form-group">
              <label for="address">Address </label>
              <input type="address" className="form-control" name="address" id="address" placeholder="Enter your address" onChange={handleChange} required />
            </div>

            <div className="col-sm-6 form-group">
              <label for="relationWithStudent">Relation With Student </label>
              <input type="text" className="form-control" name="relationWithStudent" id="relationWithStudent" placeholder="Enter relation with student" onChange={handleChange} required />
            </div>

            <div className="col-sm-6 form-group">
              <label for="password">Password</label>
              <input type="Password" name="password" className="form-control" id="password" placeholder="Enter your password." onChange={handleChange} required />
            </div>
            <div className="col-sm-6 form-group" >
              <label for="confirmPassword">Confirm Password</label>
              <input type="Password" name="confirmPassword" className="form-control" id="confirmPassword" placeholder="Re-enter your password." onChange={handleChange} required />
            </div>

            <div className="col-sm-6 form-group">
              <label for="gender">Gender</label>
              <select id="gender" name='gender' className="form-control browser-default custom-select" onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-sm-12 form-group mb-0">
              <button className="btn btn-denger float-right" id='b' type='submit'>Submit</button>
            </div>

          </div>
        </form>
      </div>
    );
  }
}

export default ParentReg;
