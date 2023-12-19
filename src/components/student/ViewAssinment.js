
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making API calls
import Modal from './Modal'
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

  marginTop: '5vh',
  marginButtom: '5vh',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%', /* Set the form to full width */
  borderradius: '8px', /* Remove border-radius for a sharper look */
  color: 'white' /* Set text color to white */
  /* animation: 'fadeIn 1s ease-in',  Apply a fade-in animation */


};




const ViewAssignment = (props) => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [subject, setSubject] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students/fetchAssignment', {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        }); // Use the correct API endpoint
        setAssignments(response.data);
        console.log(assignments)
      } catch (error) {
        console.error(error);
      }
    };

    fetchAssignments();
  }, []); // The empty dependency array ensures that this effect runs once after the initial render
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleAssignmentSubmission = (file) => {
    // Perform the logic to submit the assignment file
    // You can use FormData to send the file to the server
    setSubject(selectedAssignment.subject);
    const formData = new FormData();
    formData.append('name', localStorage.getItem('name'));
    formData.append('rollNo', localStorage.getItem('rollNo'));
    formData.append('subject', selectedAssignment.subject);
    formData.append('assignment', file);


    // Make a POST request to submit the assignment file
    axios.post(`http://localhost:5000/api/students/submitAssignment`, formData, {
      headers: {
        'auth-token': localStorage.getItem('token')
      }, formData
    })
      .then((response) => {
        // Handle the response if needed
        console.log('Assignment submitted successfully:', response.data);
        navigate('/shome')
        props.showAlert("Assignment submitted successfully", "success")
      })
      .catch((error) => {
        // Handle errors if any
        console.error('Error submitting assignment:', error);
        props.showAlert("Problem while submittin the assignment or network error", "danger")
      })
      .finally(() => {
        // Close the modal after submission
        setIsModalOpen(false);
      });
  };

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
    <div className="container" style={{ containerStyle, backgroundColor: '#ECDBBA', marginTop: '5vh' }} >
      <h2 className='text-center bg-primary py-2 mb-3 heading-bar'>Assignment</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={tableCellStyle}>S.N</th>
              <th style={tableCellStyle}>Subject Name</th>
              <th style={tableCellStyle}>Given Date</th>
              <th style={tableCellStyle}>Submittion Date</th>
              <th style={tableCellStyle}>Questions</th>
              <th style={tableCellStyle}></th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={assignment._id}>
                <td style={tableCellStyle}>{index + 1}.</td>
                <td style={tableCellStyle}>{assignment.subject}</td>
                <td style={tableCellStyle}>{formatDate(assignment.givenDate)}</td>
                <td style={tableCellStyle}>{formatDate(assignment.submissionDate)}</td>
                <td style={tableCellStyle}>{assignment.questions}</td>
                <td><button onClick={() => { setIsModalOpen(true); setSelectedAssignment(assignment); }}>Submit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAssignmentSubmission}
        />
      </div>
    </div>
  );

};

export default ViewAssignment;
