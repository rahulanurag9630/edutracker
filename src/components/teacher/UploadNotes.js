import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bluepatti from '../../assets/BluePatti.css'
const UploadNotes = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    subjectCode: '',
    unit: '',
    notes: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      notes: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { subject, subjectCode, unit, notes } = formData;

    try {
      const formData = new FormData();
      formData.append('subject', subject);
      formData.append('subjectCode', subjectCode);
      formData.append('unit', unit);
      formData.append('notes', notes);

      const response = await axios.post('http://localhost:5000/api/teacher/uploadNotes', formData, {
        headers: {
          'auth-token': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Notes Uploaded:', response.data);
      navigate('/thome');
      props.showAlert("Note Uploaded successfully ", "success")
      // Handle success, show a success message, or redirect the user
      // For example, you can show a success message to the user
    } catch (error) {
      console.error('Error uploading notes:', error);
      props.showAlert("Somthing went wrong", "danger")
      // Handle error, show an error message to the user
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
 
    return (
      <div className="container my-5" style={{ backgroundColor: '#ECDBBA' }}>
        <div className="heading-bar text-center bg-primary py-2 mb-3">
          <h2 className="text-white">Upload Notes</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="subject" className="form-label">Subject:</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="subjectCode" className="form-label">Subject Code:</label>
              <input
                type="text"
                className="form-control"
                id="subjectCode"
                name="subjectCode"
                value={formData.subjectCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="unit" className="form-label">Unit:</label>
              <input
                type="text"
                className="form-control"
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="notes" className="form-label">File:</label>
              <input
                type="file"
                className="form-control"
                id="notes"
                name="notes"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <button type="submit" className="btn btn-primary">Upload</button>
            </div>
          </div>
        </form>
      </div>
    );
  
};

export default UploadNotes;
