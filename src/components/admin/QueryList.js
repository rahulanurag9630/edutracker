import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/QueryList.css'; // Import the CSS file for component-specific styles
import { useNavigate } from 'react-router-dom';

function QueryList() {
  const navigate = useNavigate();
  const [queries, setQueries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in by default

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/fetchQueries');
        setQueries(response.data);
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };

    fetchData();

    // Check if user is authenticated (you may use your own authentication logic here)
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      setIsLoggedIn(false);
    }
  }, []); // The empty array ensures that this effect runs once, after the initial render

  useEffect(() => {
    // If user is not authenticated, redirect to the login page
    if (!isLoggedIn) {
      navigate('/'); // Change '/login' to the appropriate login route
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    // Do not render anything if the user is not authenticated
    return null;
  }

  return (
    <div className="query-list-container">
      <h2 className="query-list-heading">Queries List</h2>
      <ul className="query-list">
        {queries.map((query) => (
          <li key={query._id} className="query-item">
            <strong className="query-item-label">Name:</strong> {query.name}<br />
            <strong className="query-item-label">Email:</strong> {query.email}<br />
            <strong className="query-item-label">Message:</strong> {query.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QueryList;
