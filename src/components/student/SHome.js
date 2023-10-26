import React,{useState,useEffect} from 'react'
import ViewNotice from './ViewNotice'
import Carousel from '../common/Carousel';
import { useNavigate } from 'react-router-dom';
// import StudentNav from '../common/StudentNav'

function SHome() {
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
  else{
  return (
    <div className='container'>
      <Carousel/>
    <ViewNotice/>
    </div>
  );}
}

export default SHome