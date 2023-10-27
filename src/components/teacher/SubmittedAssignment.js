import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/SubmittedAssignment.css'; // Import the CSS file for component-specific styles
import { useNavigate } from 'react-router-dom';

function SubmittedAssignment() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/teacher/fetchAssignment`, {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        });
        setAssignments(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchData();
  }, []);


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
    <div className="assignments-container">
      <h1 className="assignments-heading">Submitted Assignments</h1>
      {loading ? (
        <div className="loading">Loading...</div> // Loading animation/message while data is being fetched
      ) : (
        <table className="assignments-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Subject</th>
              <th>Assignment</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id}>
                <td>{assignment.name}</td>
                <td>{assignment.rollNo}</td>
                <td>{assignment.subject || 'N/A'}</td>
                <td>
                  <a
                    href={`http://localhost:5000/assignment/${assignment.assignment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-link"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SubmittedAssignment;
