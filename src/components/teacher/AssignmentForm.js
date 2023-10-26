import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const AssignmentForm = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    givenDate: '',
    submissionDate: '',
    class: '',
    questions: '',
    expiresAt: '', // Include expiresAt field in the form data
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate expiresAt based on givenDate
    const givenDate = new Date(formData.givenDate);
    givenDate.setDate(givenDate.getDate() + 7); // 7 days expiration
    const expiresAt = givenDate.toISOString(); // Convert to ISO format

    try {
      const response = await axios.post(
        'http://localhost:5000/api/teacher/uploadAssignment',
        {
          ...formData,
          expiresAt, // Add expiresAt to the form data
        },
        {
          headers: {
            'auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Assignment Uploaded:', response.data);
      navigate('/');
      props.showAlert("Assignment given successfully", "success")
      // onSubmit(response.data);
    } catch (error) {
      console.error('Error uploading assignment:', error);
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
      <div className="container mt-5" style={{ backgroundColor: '#ECDBBA' }}>
        <div className="heading-bar text-center bg-primary py-2 mb-3">
          <h2 className="text-white">Give Assignment</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Subject Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  value={formData.subjectName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Given Date:</label>
                <input
                  type="date"
                  className="form-control"
                  name="givenDate"
                  value={formData.givenDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Submission Date:</label>
                <input
                  type="date"
                  className="form-control"
                  name="submissionDate"
                  value={formData.submissionDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Class:</label>
                <input
                  type="text"
                  className="form-control"
                  name="class"
                  value={formData.classRoom}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Questions (at least 5):</label>
            <textarea
              className="form-control"
              rows="5"
              name="questions"
              value={formData.questions}
              onChange={handleInputChange}
              required
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <br />
        </form>
      </div>

    );
  }
};

export default AssignmentForm;
