import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentPhoto() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]); // Set an empty array as initial state
  const studentId = '6511130a8a83bdcb7e8c1af6';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/teacher/fetchAllStudents?semester=${1}`);

        setStudents(response.data);

        // Assuming there's a specific student ID you want to get the photo for

      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchData();
  }, [studentId]);

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
      <div>
        <h2>Students' Photos</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {students.map(student => (
            <div key={student._id} style={{ margin: '10px', textAlign: 'center' }}>
              <img
                src={`http://localhost:5000/uploads/${student.photo}`}
                alt={`${student.firstName} ${student.lastName}`}
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
              <p>{`${student.firstName} ${student.lastName}`}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default StudentPhoto;
