import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NoticeForm = (props) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    nFor: 'Student', // Set a default value for nFor
    noticeType: '',
    notice: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/teacher/postNotices',
        formData,
        {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        }
      );
      navigate('/thome');
      props.showAlert('Notice Added successfully', 'success');
    } catch (error) {
      console.error(error);
      props.showAlert('Something went wrong', 'danger');
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
    <div className="container mt-5" style={{ backgroundColor: '#ECDBBA' }}>
      <div className="heading-bar text-center bg-primary py-2 mb-3">
        <h2 className="text-white">Notices</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Notice Audience:</label>
          <select
            className="form-control"
            name="nFor"
            value={formData.nFor} // Ensure the value is set correctly
            onChange={handleInputChange}
            required
          >
            <option value="Student">Student</option>
            <option value="Parent">Parent</option>
          </select>
        </div>
        <div className="form-group">
          <label>Notice Type:</label>
          <input
            type="text"
            className="form-control"
            name="noticeType"
            value={formData.noticeType}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Notice:</label>
          <textarea
            className="form-control"
            name="notice"
            value={formData.notice}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Notice
        </button>
      </form>
    </div>
  );

};

export default NoticeForm;
