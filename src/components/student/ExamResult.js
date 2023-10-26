import React, { useState, useEffect } from 'react';
import '../../assets/ExamResult.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExamResult = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const rollNo = localStorage.getItem('rollNo')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/examResult/${rollNo}`, {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        });

        setResult(response.data);
      } catch (error) {
        console.error('Error fetching exam result:', error);
        // Handle network error, display a message to the user, etc.
      }
    };

    fetchData();
  }, []); 
  /////
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculatePercentage = () => {
    if (result && result.subjects && result.subjects.length > 0) {
      const totalMarks = result.subjects.reduce((acc, subject) => acc + subject.totalMarks, 0);
      const obtainedMarks = result.subjects.reduce((acc, subject) => acc + subject.obtainedMarks, 0);
      const percentage = (obtainedMarks / totalMarks) * 100;
      return percentage.toFixed(2); // Limit decimal places to 2
    }
    return 0;
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
 else{
  return (
    <div className="exam-result-container">
      <h2 style={{marginLeft:'34vw'}}>Exam Result</h2>
      {result && (
        <>
          <div className="student-info">
            <p><strong>Student Name:</strong> {result.studentName}</p>
            <p><strong>Father's Name:</strong> {result.fatherName}</p>
            <p><strong>Roll No:</strong> {result.rollNo}</p>
            <p><strong>Exam Date:</strong> {formatDate(result.examDate)}</p>
          </div>
          {result.subjects && result.subjects.length > 0 && (
            <div className="subjects-list">
              <h3>Subjects</h3>
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Subject Code</th>
                    <th>Total Marks</th>
                    <th>Obtained Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {result.subjects.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.subName}</td>
                      <td>{subject.subCode}</td>
                      <td>{subject.totalMarks}</td>
                      <td>{subject.obtainedMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="percentage">
                <strong>Overall Percentage:</strong> {calculatePercentage()}%
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );}
};

export default ExamResult;
