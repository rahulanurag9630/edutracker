import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import '../../assets/ExamResult.css'


const Results = () => {
  const navigate = useNavigate();
  const [rollNos, setRollNos] = useState([]);
  const [selectedRollNo, setSelectedRollNo] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  ///////////////////////////////////////////////
  const [result, setResult] = useState(null);


  //////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const contactNumber = localStorage.getItem('contactNumber');
    if (contactNumber) {
      fetchRollNos(contactNumber);
    }
  }, []);

  const fetchRollNos = async (contactNumber) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/parents/fetchRollNo/?contactNumber=${contactNumber}`, {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      });
      const data = response.data;
      setRollNos(data.rollNumbers);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching roll numbers:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const handleFindResult = () => {


    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/examResult/${selectedRollNo}`, {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        });

        setResult(response.data);
      } catch (error) {
        console.error('Error fetching exam result:', error);
        console.log(selectedRollNo);
        // Handle network error, display a message to the user, etc.
      }
    };

    fetchData();
  }
  /////
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      // If user is not logged in, redirect to home page
      navigate('/');
      setIsLoggedIn(false); 

    }
  }, [navigate]);

  // If user is not authenticated, do not render the component
  if (!isLoggedIn) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <select value={selectedRollNo} onChange={(e) => setSelectedRollNo(e.target.value)}>
        <option value="">Select Roll No</option>
        {rollNos.map((rollNo, index) => (
          <option key={index} value={rollNo}>
            {rollNo}
          </option>
        ))}
      </select>
      <button onClick={handleFindResult}>Find Result</button>
      {result ? (
        <div className="exam-result-container" style={{ backgroundColor: '#ECDBBA', marginTop: '5vh' }}>
          <h2 style={{ marginLeft: '25vw' }}>Exam Result</h2>
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
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <p>Please select the roll.</p>
      )}
    </div>
  );


};

export default Results;
