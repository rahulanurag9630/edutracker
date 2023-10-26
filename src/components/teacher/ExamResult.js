import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/ExamResult.css'

const ExamResult = ({ onSubmit,props }) => {
  const navigate = useNavigate();
  

  const initialSubject = {
    subName: '',
    subCode: '',
    totalMarks: '',
    obtainedMarks: ''
  };

  const [formData, setFormData] = useState({
    studentName: '',
    rollNo: '',
    fatherName: '',
    examDate: '',
    subjects: [initialSubject]
  });

  const handleOnChange = (e, index) => {
    const { name, value } = e.target;

    if (name === 'subName' || name === 'subCode' || name === 'totalMarks' || name === 'obtainedMarks') {
      // Handle subject-related fields
      const updatedSubjects = [...formData.subjects];
      updatedSubjects[index][name] = value;
      setFormData({ ...formData, subjects: updatedSubjects });
    } else {
      // Handle non-subject fields
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSubject = () => {
    setFormData(prevState => ({
      ...prevState,
      subjects: [...prevState.subjects, { ...initialSubject }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/teacher/submitExamResult`, formData, {
        headers: {
          'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOGM3ODk3YWI5ZjM1NjMwY2IxMDQzIn0sImlhdCI6MTY5NzY1MDE2M30.Nd0eqyTBhYHUBhBp3gJg9FeqxIDtoLye4CKMEuI2FWw"
        }
      });
      console.log(response.data);
      navigate('/thome');
      props.showAlert("Exam result added successfully","success")
    } catch (error) {
      // Handle errors
      console.error('Error submitting exam result:', error);
      props.showAlert("Something went wrong","danger")
      console.log(formData)
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
    <h2 className="text-white">Exam Result</h2>
  </div>
  <form onSubmit={handleSubmit} className="exam-form">
    {/* Non-subject fields */}
    <div className="form-group">
      <label>Student Name:</label>
      <input type="text" className="form-control" name="studentName" value={formData.studentName} onChange={(e) => handleOnChange(e)} required />
    </div>
    <div className="form-group">
      <label>Roll Number:</label>
      <input type="text" className="form-control" name="rollNo" value={formData.rollNo} onChange={(e) => handleOnChange(e)} required />
    </div>
    <div className="form-group">
      <label>Father's Name:</label>
      <input type="text" className="form-control" name="fatherName" value={formData.fatherName} onChange={(e) => handleOnChange(e)} required />
    </div>
    <div className="form-group">
      <label>Exam Date:</label>
      <input type="date" className="form-control" name="examDate" value={formData.examDate} onChange={(e) => handleOnChange(e)} required />
    </div>

    {/* Subject-related fields */}
    {formData.subjects.map((subject, index) => (
      <div className="subject-container" key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '48%' }}>
          <div className="form-group">
            <label>Subject Name:</label>
            <input type="text" className="form-control" name="subName" value={subject.subName} onChange={(e) => handleOnChange(e, index)} required />
          </div>
          <div className="form-group">
            <label>Subject Code:</label>
            <input type="text" className="form-control" name="subCode" value={subject.subCode} onChange={(e) => handleOnChange(e, index)} required />
          </div>
          
        </div>
        <div style={{ width: '48%' }}>
        <div className="form-group">
            <label>Total Marks:</label>
            <input type="number" className="form-control" name="totalMarks" value={subject.totalMarks} onChange={(e) => handleOnChange(e, index)} required />
          </div>
          <div className="form-group">
            <label>Obtained Marks:</label>
            <input type="number" className="form-control" name="obtainedMarks" value={subject.obtainedMarks} onChange={(e) => handleOnChange(e, index)} required />
          </div>
          {/* Add more fields here if needed */}
        </div>
      </div>
    ))}

    <br />
    <button type="button" className="btn btn-primary mr-2" onClick={handleAddSubject}>
      Add Subject
    </button>
    <button type="submit" className="btn btn-success">
      Submit
    </button>
  </form>
</div>

  );
}
};

export default ExamResult;
