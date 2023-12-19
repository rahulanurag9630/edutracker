import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const rollNo = localStorage.getItem('rollNo');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/fetchStudent?rollNo=${rollNo}`, {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        });
        if (response.data.success) {
          setStudent(response.data.student);
        } else {
          setError(response.data.error);
        }
      } catch (error) {
        console.error('Error fetching roll numbers:', error);
        setLoading(false); // Set loading to false in case of an erro
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [rollNo]);

  ///////
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    return (
      <div className="profile-container">
        {loading ? (
          <p>Loading student data...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : student ? (
          <div className="profile-header">
            <img src={`http://localhost:5000/uploads/${student.photo}`} alt={`${student.firstName} ${student.lastName}`} className="profile-photo" />
            <h1>{`${student.firstName} ${student.lastName}`}</h1>
            <p>Email: {student.email}</p>
            <p>Contact Number: {student.contactNumber}</p>
            <p>Parent Contact: {student.parentContact}</p>
            <p>Date of Birth: {new Date(student.dateOfBirth).toLocaleDateString()}</p>
            <p>Address: {student.address}</p>
            <p>Gender: {student.gender}</p>
            <div className="profile-details">
              <h2>Student Details</h2>
              <p>Roll Number: {rollNo}</p>
              <p>Current Semester: {student.currentSem}</p>
            </div>
          </div>
        ) : null}
      </div>
    );
  
};

export default Profile;
