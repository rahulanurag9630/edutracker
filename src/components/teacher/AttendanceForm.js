import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AttendanceForm = ( props ) => { 
  const navigate = useNavigate()
  const [semester, setSemester] = useState('');
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const [searched, setSearched] = useState(false);
  const [remarks, setRemarks] = useState('');
  const currentDate = new Date().toISOString().split('T')[0];
  useEffect(() => {
    // Initialize attendanceData with default values when students change
    setAttendanceData(
      students.map((student) => ({
        name: student.name,
        rollNo: student.rollNo,
        studentId: student._id,
        attendance: 'present', // Default to 'present' for all students
        remarks: ' ',

      }))
    );
  }, [students]);


  const getStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/teacher/fetchAllStudents?semester=${semester}`);
      const studentsWithInfo = response.data.map(student => ({
        _id: student._id,
        name: `${student.firstName} ${student.lastName}`,
        rollNo: student.rollNo,
        semester: student.currentSem,
        attendance: 'present', // Default to 'present' for all students
        remarks: '', // Default remarks to an empty string
      }));
      setStudents(studentsWithInfo);
      setSearched(true);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };


  const handleFindStudents = (e) => {
    e.preventDefault();
    getStudent();
  };

  const handleAttendanceChange = (studentId, attendance) => {
    // Update attendance data based on student ID
    setAttendanceData(prevData => {
      const updatedData = prevData.map(item =>
        item.studentId === studentId ? { ...item, attendance: attendance } : item
      );
      return updatedData;
    });
  };






  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the attendance data with student details, attendance, and remarks
    const attendanceDetails = students.map((student) => ({
      name: student.name,
      rollNo: student.rollNo,
      status: attendanceData.find((item) => item.studentId === student._id)?.attendance || 'Absent', // Default to 'Absent' if no attendance record is found
      remark: attendanceData.find((item) => item.studentId === student._id)?.remarks || '', // Include remarks from the state
    }));

    // Create the complete form data to send to the backend
    const completeFormData = {
      date: currentDate,
      semester: semester,
      students: attendanceDetails,
    };

    try {
      // Send the attendance data to the backend API
      const response = await axios.post('http://localhost:5000/api/teacher/takeAttendance', completeFormData);

      // Handle the API response as needed (you can update your state, show a success message, etc.)
      navigate('/thome');
      props.showAlert("Attendance Taken successfully", "success")
      console.log('Attendance data sent successfully:', response.data);
    } catch (error) {
      // Handle API error (show error message, log the error, etc.)
      console.error('Error sending attendance data:', error);
      props.showAlert("Something went wrong  ", "danger")
    }
  };

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
      <div className="container mt-5" style={{ backgroundColor: '#ECDBBA' }}>
        <div className="heading-bar text-center bg-primary py-2 mb-3">
          <h2 className="text-white">Take Attendance</h2>
        </div>
        <form onSubmit={handleSubmit} className="attendance-form">
          <div className="form-group">
            <label htmlFor="semester">Select Semester:</label>
            <select
              id="semester"
              className="form-control"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            >
              <option value="">Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              {/* Add more semester options as needed */}
            </select>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleFindStudents}>
            Find Students
          </button>
          {searched && students.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Semester</th>
                  <th>Present/Absent</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.rollNo}</td>
                    <td>{student.semester}</td>
                    <td>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          id={`presentRadio-${student._id}`}
                          value="Present"
                          checked={
                            attendanceData.find((item) => item.studentId === student._id)?.attendance === 'Present'
                          }
                          onChange={() => handleAttendanceChange(student._id, 'Present')}
                        />


                        <label className="form-check-label" htmlFor={`presentRadio-${student._id}`}>
                          Present
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          id={`AbsentRadio-${student._id}`}
                          value="Absent"
                          checked={
                            attendanceData.find((item) => item.studentId === student._id)?.attendance === 'Absent'
                          }
                          onChange={() => handleAttendanceChange(student._id, 'Absent')}
                        />


                        <label className="form-check-label" htmlFor={`absentRadio-${student._id}`}>
                          Absent
                        </label>
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={attendanceData.find((item) => item.studentId === student._id)?.remarks}
                        onChange={(e) => {
                          const updatedData = attendanceData.map(item =>
                            item.studentId === student._id ? { ...item, remarks: e.target.value } : item
                          );
                          setAttendanceData(updatedData);
                        }}
                      />

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : searched ? (
            <p>No students found for the selected semester.</p>
          ) : null}

          <button type="submit" className="btn btn-primary">
            Submit Attendance
          </button>
        </form>
      </div>
    );
  
};

export default AttendanceForm;
