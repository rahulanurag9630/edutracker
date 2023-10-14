

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function StudentReg() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    contactNumber: '',
    parentContact: '',
    address: '',
    password: '',
    confirmPassword: '',
    gender: '',
    photo: null,
    rollNo: ''
  });

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      photo: event.target.files[0],
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('dateOfBirth', formData.dateOfBirth);
    formDataToSend.append('contactNumber', formData.contactNumber);
    formDataToSend.append('parentContact', formData.parentContact);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('confirmPassword', formData.confirmPassword);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('photo', formData.photo);
    formDataToSend.append('rollNo', formData.rollNO);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/createStudent', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      navigate('/ahome');
      // Handle success, redirect or show a success message
    } catch (error) {
      console.error(error);
      // Handle error, show error message to the user

    }
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleFormSubmit}>
        <div className="col-sm-12 mx-t3 mb-4">
          <h2 className="text-center text-info">Student Registration Form</h2>
        </div>
        <div className="col-sm-6 form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" className="form-control" name="firstName" id="firstName" placeholder="Enter your first name." onChange={handleFormChange} required />
        </div>
        <div className="col-sm-6 form-group">
          <label htmlFor="lastName">Last name</label>
          <input type="text" className="form-control" name="lastName" id="lastName" placeholder="Enter your last name." onChange={handleFormChange} required />
        </div>
        <div className="col-sm-6 form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" name="email" id="email" placeholder="Enter your email." onChange={handleFormChange} required />
        </div>
        <div className="col-sm-6 form-group">
          <label htmlFor="dateOfBirth">Date Of Birth</label>
          <input type="date" name="dateOfBirth" className="form-control" id="dateOfBirth" placeholder="" onChange={handleFormChange} required />
        </div>
        <div className="col-sm-4 form-group">
          <label htmlFor="contactNumber">Phone</label>
          <input type="tel" name="contactNumber" className="form-control" id="contactNumber" placeholder="Enter Your Contact Number." onChange={handleFormChange} required />
        </div>
        <div className="col-sm-4 form-group">
          <label htmlFor="parentContact">Parent Phone</label>
          <input type="tel" name="parentContact" className="form-control" id="parentContact" placeholder="Enter Your Contact Number." onChange={handleFormChange} required />
        </div>
        <div className="col-sm-6 form-group">
          <label htmlFor="address">Address </label>
          <input type="address" className="form-control" name="address" id="address" placeholder="Enter your address" onChange={handleFormChange} required />
        </div>
        <div className="col-sm-6 form-group">
          <label htmlForor="password">Password</label>
          <input type="Password" name="password" className="form-control" id="password" placeholder="Enter your password." onChange={handleFormChange} required />
        </div>
        <div className="col-sm-6 form-group" >
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="Password" name="confirmPassword" className="form-control" id="confirmPassword" placeholder="Re-enter your password." onChange={handleFormChange} required />
        </div>

        <div className="col-sm-6 form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name='gender' className="form-control browser-default custom-select">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">other</option>
          </select>
        </div>

        <div className="col-sm-6 form-group">
          <label htmlFor="photo">Photo</label>
          <input type="file" accept="image/*" className="form-control-file" name="photo" id="photo" onChange={handleFileChange} required />
        </div>
        <div className="col-sm-6 form-group" >
          <label htmlFor="rollNo">Assigne Roll no</label>
          <input type="text" name="rollNo" className="form-control" id="rollNo" placeholder="Assigned Roll No" onChange={handleFormChange} required />
        </div>

        <div className="col-sm-12 form-group mb-0">
          <button className="btn btn-primary float-right" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentReg;
