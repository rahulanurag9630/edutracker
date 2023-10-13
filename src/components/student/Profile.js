
      import React, { useState } from 'react';

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
};

const Notes = () => {
  // State to store the selected option for each row
  const [attendance, setAttendance] = useState({});

  // Function to update the attendance state
  const updateAttendance = (studentId, value) => {
    setAttendance({
      ...attendance,
      [studentId]: value,
    });
  };

  return (
    <div className="container" style={containerStyle}>
      <h2 style={headerStyle}>Attendance</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={tableCellStyle}>S.N</th>
              <th style={tableCellStyle}>Student Name</th>
              <th style={tableCellStyle}>Roll No</th>
              <th style={tableCellStyle}>Dates</th>
              <th style={tableCellStyle}>Attendance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tableCellStyle}>1.</td>
              <td style={tableCellStyle}>John Doe</td>
              <td style={tableCellStyle}>12345</td>
              <td style={tableCellStyle}>2023-10-01</td>
              <td style={tableCellStyle}>
                <label>
                  <input
                    type="radio"
                    value="Yes"
                    name="attendance-1"
                    checked={attendance['1'] === 'Yes'}
                    onChange={() => updateAttendance('1', 'Yes')}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="No"
                    name="attendance-1"
                    checked={attendance['1'] === 'No'}
                    onChange={() => updateAttendance('1', 'No')}
                  />
                  No
                </label>
              </td>
            </tr>
            {/* Additional rows... */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notes;
