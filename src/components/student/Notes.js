
import React from 'react';

const tableCellStyle = {
  padding: '10px',
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
  
  borderradius: '8px',
  // fontSize: '24px',
  // marginBottom: '20px',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%', /* Set the form to full width */
    padding: '20px',
    background: 'linear-gradient(45deg, #007BFF, #5590ed)', /* Apply a gradient background */
    // borderradius: '8px', /* Remove border-radius for a sharper look */
    color: 'white' /* Set text color to white */
   /* animation: 'fadeIn 1s ease-in',  Apply a fade-in animation */
  
 
};

const Notes = () => {
  return (
    <div className="container" style={containerStyle}>
      <h2 style={headerStyle}>Notes</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={tableCellStyle}>S.N</th>
              <th style={tableCellStyle}>Subject Name</th>
              <th style={tableCellStyle}>Subject code</th>
              <th style={tableCellStyle}>Unit</th>
              <th style={tableCellStyle}>File</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tableCellStyle}>1.</td>
              <td style={tableCellStyle}>Mathematics</td>
              <td style={tableCellStyle}>MATH101</td>
              <td style={tableCellStyle}>1</td>
              <td style={tableCellStyle}>
                <a
                  href="/path/to/your/file.pdf"
                  target="_blank"
                  style={{ textDecoration: 'none', color: '#007bff' }}
                >
                  Download
                </a>
              </td>
            </tr>
            <tr>
              <td style={tableCellStyle}>2.</td>
              <td style={tableCellStyle}>Mathematics</td>
              <td style={tableCellStyle}>MATH101</td>
              <td style={tableCellStyle}>1</td>
              <td style={tableCellStyle}>
                <a
                  href="/path/to/your/file.pdf"
                  target="_blank"
                  style={{ textDecoration: 'none', color: '#007bff' }}
                >
                  Download
                </a>
              </td>
            </tr>
            <tr>
              <td style={tableCellStyle}>3</td>
              <td style={tableCellStyle}>Mathematics</td>
              <td style={tableCellStyle}>MATH101</td>
              <td style={tableCellStyle}>1</td>
              <td style={tableCellStyle}>
                <a
                  href="/path/to/your/file.pdf"
                  target="_blank"
                  style={{ textDecoration: 'none', color: '#007bff' }}
                >
                  Download
                </a>
              </td>
            </tr>
            <tr>
              <td style={tableCellStyle}>4</td>
              <td style={tableCellStyle}>Mathematics</td>
              <td style={tableCellStyle}>MATH101</td>
              <td style={tableCellStyle}>1</td>
              <td style={tableCellStyle}>
                <a
                  href="/path/to/your/file.pdf"
                  target="_blank"
                  style={{ textDecoration: 'none', color: '#007bff' }}
                >
                  Download
                </a>
              </td>
            </tr>
            <tr>
              <td style={tableCellStyle}>5</td>
              <td style={tableCellStyle}>Mathematics</td>
              <td style={tableCellStyle}>MATH101</td>
              <td style={tableCellStyle}>1</td>
              <td style={tableCellStyle}>
                <a
                  href="/path/to/your/file.pdf"
                  target="_blank"
                  style={{ textDecoration: 'none', color: '#007bff' }}
                >
                  Download
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notes;
