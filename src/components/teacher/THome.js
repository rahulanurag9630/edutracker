import React, { useState, useEffect } from 'react'
import Carousel from '../common/Carousel'
import { useNavigate } from 'react-router-dom';

function THome() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      // If user is not logged in, redirect to home page
      navigate('/');
    }
  }, [localStorage.getItem('token')]);

  // If user is not authenticated, do not render the component
  if (!isLoggedIn) {
    return null;
  }
  else {
    return (
      <div>
        <Carousel />
      </div>
    )
  }
}

export default THome