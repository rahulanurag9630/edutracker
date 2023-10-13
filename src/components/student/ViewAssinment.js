
import React from 'react';

const tableCellStyle = {
  padding:'10px',
  textAlign: 'center',
};

const containerStyle = {
  marginTop: '30px',
  padding: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '5px',
  backgroundColor: 'lightblue', // Set the background color to light blue
};

const headerStyle = {
  fontSize: '24px',
  marginBottom: '20px',
  
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%', /* Set the form to full width */
    padding: '20px',
    background: 'linear-gradient(45deg, #007BFF, #5590ed)', /* Apply a gradient background */
    borderradius: '8px', /* Remove border-radius for a sharper look */
    color: 'white' /* Set text color to white */
   /* animation: 'fadeIn 1s ease-in',  Apply a fade-in animation */
  
 
};


const ViewAssinment = () => {
  return (
    <div className="container" style={containerStyle}>
      <h2 style={headerStyle}>Assignment</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={tableCellStyle}>S.N</th>
              <th style={tableCellStyle}>Subject Name</th>
              <th style={tableCellStyle}>Subject Code</th>
              <th style={tableCellStyle}>Author</th>
              <th style={tableCellStyle}>Questions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tableCellStyle}>1.</td>
              <td style={tableCellStyle}>Software Architecture</td>
              <td style={tableCellStyle}>CS-703</td>
              <td style={tableCellStyle}>Vipul Kumar Kewat</td>
              <td style={tableCellStyle}>Explain the Software Architecture?</td>
         
            </tr>
            {/* Additional rows... */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAssinment;