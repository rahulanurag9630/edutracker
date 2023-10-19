import React, { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const NoticeForm = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    noticeType: '',
    notice: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(`http://localhost:5000/api/teacher/submitExamResult`, formData,{
        headers:{
          'auth-token':localStorage.getItem.token
        }
      });
      navigate('/thome')
      
    } catch (error) {
      
    }
  };

  return (
    <div className="container mt-5">
      <div className="heading-bar text-center bg-primary py-2 mb-3">
        <h2 className="text-white">Notices</h2>
      </div>
      <form onSubmit={handleSubmit}>
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
