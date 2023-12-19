import React, { useState, useEffect } from 'react';
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



const MonitorAttendance = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);

  const [rollNos, setRollNos] = useState([]);
  const [selectedRollNo, setSelectedRollNo] = useState('');
  const [loading, setLoading] = useState(true);
  //////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const contactNumber = localStorage.getItem('contactNumber');
    if (contactNumber) {
      fetchRollNos(contactNumber);
    }
  }, []);

  const fetchRollNos = async (contactNumber) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/parents/fetchRollNo/?contactNumber=${contactNumber}`, {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      });
      const data = response.data;
      setRollNos(data.rollNumbers);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching roll numbers:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };
  const handleFindAttendance = () => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/fetchAttendance`, {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        });

        if (response.status === 200) {
          // Filter the attendance records for the matching student
          const filteredAttendance = response.data.map((attendanceRecord) => {
            const filteredStudents = attendanceRecord.students.filter((student) => student.rollNo === selectedRollNo);
            if (filteredStudents.length > 0) {
              return {
                ...attendanceRecord,
                students: filteredStudents,
              };
            }
            return null;
          }).filter((record) => record !== null);

          setAttendance(filteredAttendance);
        } else {
          console.error('Error fetching attendance:', response.data.error);
          // Handle error condition, display a message to the user, etc.
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
        // Handle network error, display a message to the user, etc.
      }
    };

    fetchData();
  } // Include userRollNo as a dependency to fetch data when it changes
  // Include userRollNo as a dependency to fetch data when it changes
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  //////////////////////////////////////
  const getStatusCellStyle = (status) => {
    if (status === 'Present') {
      return {
        ...tableCellStyle,
        color: 'green',
        fontWeight: 'bold',
      };
    } else if (status === 'Absent') {
      return {
        ...tableCellStyle,
        color: 'red',
      };
    }

    return tableCellStyle;
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
    <div className="container" style={containerStyle}>
      <select value={selectedRollNo} onChange={(e) => setSelectedRollNo(e.target.value)}>
        <option value="">Select Roll No</option>
        {rollNos.map((rollNo, index) => (
          <option key={index} value={rollNo}>
            {rollNo}
          </option>
        ))}
      </select>
      <button onClick={handleFindAttendance}>Find Attendance</button>
      <div className="container" style={{ containerStyle, backgroundColor: '#ECDBBA', marginTop: '5vh' }} >
        <h2 className='text-center bg-primary py-2 mb-3 heading-bar'>Attendance</h2>
        <div className="table-responsive">
          <table className="table table-bordered" style={{ borderColor: 'black' }}>
            <thead>
              <tr>
                <th style={tableCellStyle}>S.N</th>
                <th style={tableCellStyle}>Date</th>
                <th style={tableCellStyle}>Status</th>
                <th style={tableCellStyle}>Remark</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((attendanceRecord, index) => (
                attendanceRecord.students.map((student, studentIndex) => (
                  <tr key={`${attendanceRecord._id}-${student._id}`}>
                    <td style={tableCellStyle}>{index + 1}.{/*{studentIndex + 1}*/}</td>
                    <td style={tableCellStyle}>{formatDate(attendanceRecord.date)}</td>
                    <td style={getStatusCellStyle(student.status)} >{student.status}</td>

                    <td style={tableCellStyle} >{student.remark}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export default MonitorAttendance;