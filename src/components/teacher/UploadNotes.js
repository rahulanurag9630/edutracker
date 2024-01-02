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

  const [fileSize, setFileSize] = useState(0); // State variable to store file size
  const [errorMessage, setErrorMessage] = useState(''); // State variable for error message

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 20 * 1024 * 1024; // 20 MB in bytes

    if (selectedFile && selectedFile.size > maxSize) {
      setFileSize(selectedFile.size);
      setErrorMessage('File size exceeds the limit (20 MB). Please select a smaller file.');
    } else {
      setFileSize(0);
      setErrorMessage('');
      setFormData({
        ...formData,
        notes: selectedFile
      });
    }
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
      setIsLoggedIn(false)
    }
  }, [localStorage.getItem('token')]);

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
            {fileSize > 0 && (
              <div className="text-danger">{`File size: ${(fileSize / (1024 * 1024)).toFixed(2)} MB`}</div>
            )}
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
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
