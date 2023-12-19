import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/images/Dark Green Chalk Board Good Luck Card1.jpg';

import  '../../assets/notice.css';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  color: 'white', // Set the text color to white
  padding: '20px', // Add some padding for spacing
  backgroundImage: `url(${img})`, // Set the background image using template literals
  backgroundSize: 'cover', // Adjust the background size as needed
};



const textareaStyle = {
  width: '85%',
  minHeight: '500px',
  border: '2px solid blue',
  marginBottom: 'px', // Add spacing below the textarea
};

const noticeStyle = {
  fontSize: '24px',
  marginright: '90px',
  width: '100%', /* Set the form to full width */
  padding: '20px',
  background: 'linear-gradient(45deg, #007BFF, #5590ed)', /* Apply a gradient background */
  borderradius: '8px', /* Remove border-radius for a sharper look */
  color: 'white'
};

// const noticeStyle = {
//   width: '100%', /* Set the form to full width */
//     padding: '20px',
//     background: 'linear-gradient(45deg, #007BFF, #5590ed)', /* Apply a gradient background */
//     borderradius: '8px', /* Remove border-radius for a sharper look */
//     color: 'white' /* Set text color to white */
//    /* animation: 'fadeIn 1s ease-in',  Apply a fade-in animation */


// };

// ... (imports and styles)

export default function ViewNotice() {
  const [notice, setNotice] = useState([]);
  const userType = localStorage.getItem('userType');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/parents/fetcheNotice`, {
          params: { userType: userType },
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        });

        // Ensure that the response.data is an array before setting the state
        if (Array.isArray(response.data)) {
          setNotice(response.data);
        } else {
          // Handle the case where the response is not an array (could be null, undefined, or other unexpected data)
          console.error('Invalid response data:', response.data);
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle network error, display a message to the user, etc.
      }
    };

    fetchData();
  }, [userType]);
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
      <div style={{ ...containerStyle }} >
        <div style={textareaStyle} className='notice'>
          <center><h2 style={{color:'black' ,backgroundColor:'blueviolet'}}>View Notice</h2></center><br /><br />
          <center>{notice.map((item, index) => (
            <h2 key={index} style={{color:'black'}}>{item.notice}</h2>
          ))}</center>
        </div>
      </div>
    );
  
}
