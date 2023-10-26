
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]); // Set an empty array as initial state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/downloadNotes`, {
          headers: {
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50Ijp7ImlkIjoiNjUyOTc4OTUwNjEzZmQxYWQxYjc4MmZiIn0sImlhdCI6MTY5NzIxNjY2Mn0.03jlAjNQAdQpI7vZopSIzmsGK--7Jb29TS0GtOg9TDA'

          }
        });

        setNotes(response.data);

        // Assuming there's a specific student ID you want to get the photo for

      } catch (error) {
        console.error('Error fetching students:', error);
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
  else {
    return (
      <div className="container" style={{ containerStyle, backgroundColor: '#ECDBBA', marginTop: '5vh' }}>
        <h2 className='text-center bg-primary py-2 mb-3 heading-bar' style={{ marginTop: '10px' }}>Notes</h2>
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

              {notes.map((notes, index) => (
                <tr key={Notes._id}>
                  <td style={tableCellStyle}>{index + 1}.</td>
                  <td style={tableCellStyle}>{notes.subject}</td>
                  <td style={tableCellStyle}>{notes.subjectCode}</td>
                  <td style={tableCellStyle}>{notes.unit}</td>
                  <td style={tableCellStyle}>
                    <a
                      href={`http://localhost:5000/notes/${notes.notes}`}
                      target="_blank"
                      style={{ textDecoration: 'none', color: '#007bff' }}
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
              {/* <tr>
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
            </tr> */}

            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Notes;
