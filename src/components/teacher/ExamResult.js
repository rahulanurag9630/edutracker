import React, { useState } from 'react';
import BluePatti from '../../assets/BluePatti.css'


const ExamResult = ({ onSubmit }) => {
  const [studentName, setStudentName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [subjects, setSubjects] = useState([]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSubjects = [...subjects];
    updatedSubjects[index][name] = value;
    setSubjects(updatedSubjects);
  };

  const handleAddSubject = () => {
    const newSubject = {
      name: '',
      code: '',
      totalMarks: '',
      obtainedMarks: '',
    };
    setSubjects([...subjects, newSubject]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ studentName, examDate, subjects });
  };

  return (
    <div className="container mt-5">
      <div className="heading-bar text-center bg-primary py-2 mb-3">
        <h2 className="text-white">Exam Result</h2>
      </div>
      <form onSubmit={handleSubmit} className="exam-form">
        <div className="form-group">
          <label>Student Name:</label>
          <input type="text" className="form-control" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Exam Date:</label>
          <input type="date" className="form-control" value={examDate} onChange={(e) => setExamDate(e.target.value)} required />
        </div>
        {subjects.map((subject, index) => (
          <div className="subject-container" key={index}>
            <div className="form-group">
              <label>Subject Name:</label>
              <input type="text" className="form-control" name="name" value={subject.name} onChange={(e) => handleInputChange(e, index)} required />
            </div>
            <div className="form-group">
              <label>Subject Code:</label>
              <input type="text" className="form-control" name="code" value={subject.code} onChange={(e) => handleInputChange(e, index)} required />
            </div>
            <div className="form-group">
              <label>Total Marks:</label>
              <input type="number" className="form-control" name="totalMarks" value={subject.totalMarks} onChange={(e) => handleInputChange(e, index)} required />
            </div>
            <div className="form-group">
              <label>Obtained Marks:</label>
              <input type="number" className="form-control" name="obtainedMarks" value={subject.obtainedMarks} onChange={(e) => handleInputChange(e, index)} required />
            </div>
          </div>
        ))} <br />
        <button type="button" className="btn btn-primary mr-2" onClick={handleAddSubject}>
          Add Subject
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExamResult;
