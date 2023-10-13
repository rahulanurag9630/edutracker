import React, { useState } from 'react';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  // Set the background color to #1E90FF
  color: 'white', // Set the text color to white
  padding: '20px', // Add some padding for spacing
};

const textareaStyle = {
  width: '85%',
  minHeight:'500px',
border:'2px solid blue',
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

export default function ViewNotice() {
  const [notice, setNotice] = useState('');

  const updateNotice = (event) => {
    setNotice(event.target.value);
  };

  return (
    <div style={containerStyle}>
       <div style={textareaStyle}>
      <h1 style={noticeStyle}>View Notice</h1>
     
      "View notice here..."{updateNotice}{notice}
        
      </div>
      <button onClick={() => alert('Notice Saved!')} >
        Save
      </button>
    </div>
  );
}
