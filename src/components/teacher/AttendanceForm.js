import React, { useState } from 'react';
import BluePatti from '../../assets/BluePatti.css'

const AttendanceForm = ({ studentName, rollNumber,  onSubmit }) => {
  const [attendance, setAttendance] = useState('present');
  const [remarks, setRemarks] = useState('');
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ studentName, rollNumber, date:currentDate, attendance, remarks });
  };

  return (
    <div className="container mt-5">
      <div className="heading-bar text-center bg-primary py-2 mb-3">
        <h2 className="text-white">Take Attendance</h2>
      </div>
      <form onSubmit={handleSubmit} className="attendance-form">
        <table className="table">
          <thead>
          <tr>
              <th>Name:</th>
              <th>Roll No:</th>
              <th>Date:</th>
              <th>Present/Absent:</th>
              <th>Remarks:</th>

            </tr>
          </thead>
          <tbody>
            
            <tr>
              <td>{studentName}</td>
              <td>{rollNumber}</td>
              <td>{currentDate}</td>
              <td>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" id="presentRadio" value="present" checked={attendance === 'present'} onChange={() => setAttendance('present')} />
                  <label className="form-check-label" htmlFor="presentRadio">Present</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" id="absentRadio" value="absent" checked={attendance === 'absent'} onChange={() => setAttendance('absent')} />
                  <label className="form-check-label" htmlFor="absentRadio">Absent</label>
                </div>
              </td>
              <td>
                <input type="text" className="form-control" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
              </td>
            </tr>
           
           
           
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AttendanceForm;
