import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceForm = ({ onSubmit }) => {
  const [semester, setSemester] = useState('');
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const currentDate = new Date().toISOString().split('T')[0];


  const getStudent = async (e) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/teacher/fetchAllStudenst`, semester, {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },

      });


      setStudents(response.data);

    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };



  const handleAttendanceChange = (studentId, value) => {
    // Update attendance data based on student ID
    const updatedAttendanceData = attendanceData.map((item) =>
      item.studentId === studentId ? { ...item, attendance: value } : item
    );
    setAttendanceData(updatedAttendanceData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      date: currentDate,
      attendanceData: attendanceData,
    };
    onSubmit(formData);
  };

  return (
    <div className="container mt-5">
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
            onChange={getStudent}
            required
          >
            <option value="">Select Semester</option>
            {/* Add your semester options here */}
            <option value="1">1</option>
            <option value="2">2</option>
            {/* Add more semester options as needed */}
          </select>
        </div>
        {students.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Present/Absent</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.firstName}</td>
                  <td>{student.rollNumber}</td>
                  <td>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id={`presentRadio-${student._id}`}
                        value="present"
                        checked={
                          attendanceData.find((item) => item.studentId === student._id)?.attendance ===
                          'present'
                        }
                        onChange={() => handleAttendanceChange(student._id, 'present')}
                      />
                      <label className="form-check-label" htmlFor={`presentRadio-${student._id}`}>
                        Present
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id={`absentRadio-${student._id}`}
                        value="absent"
                        checked={
                          attendanceData.find((item) => item.studentId === student._id)?.attendance ===
                          'absent'
                        }
                        onChange={() => handleAttendanceChange(student._id, 'absent')}
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
                      value={
                        attendanceData.find((item) => item.studentId === student._id)?.remarks || ''
                      }
                      onChange={(e) =>
                        handleAttendanceChange(student._id, {
                          attendance:
                            attendanceData.find((item) => item.studentId === student._id)?.attendance ||
                            'present',
                          remarks: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
