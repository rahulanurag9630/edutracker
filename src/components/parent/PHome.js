import React, { useState, useEffect } from 'react'
import ViewNotice from '../student/ViewNotice'
import { useNavigate } from 'react-router-dom'
import Carousel from '../common/Carousel'

function PHome() {
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
  }, [navigate]);

  // If user is not authenticated, do not render the component
  if (!isLoggedIn) {
    return null;
  }
 
    return (
      <div>
        <Carousel />
        <ViewNotice />
      </div>
    )
  
}

export default PHome