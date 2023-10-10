import React, { useState } from 'react';

const AssignmentForm = ({ onSubmit }) => {
  const [subjectName, setSubjectName] = useState('');
  const [givenDate, setGivenDate] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [classRoom, setClassRoom] = useState('');
  const [questions, setQuestions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ subjectName, givenDate, submissionDate, classRoom, questions });
  };

  return (
    <div className="container mt-5">
      <div className="heading-bar text-center bg-primary py-2 mb-3">
        <h2 className="text-white">Give assignment</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Subject Name:</label>
          <input type="text" className="form-control" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Given Date:</label>
          <input type="date" className="form-control" value={givenDate} onChange={(e) => setGivenDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Submission Date:</label>
          <input type="date" className="form-control" value={submissionDate} onChange={(e) => setSubmissionDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Class:</label>
          <input type="text" className="form-control" value={classRoom} onChange={(e) => setClassRoom(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Questions (at least 5):</label>
          <textarea className="form-control" rows="5" value={questions} onChange={(e) => setQuestions(e.target.value)} required />
        </div>
        <br/>
        <button type="submit" className="btn btn-primary">Submit</button>
        <br/>
      </form>
    </div>
  );
};

export default AssignmentForm;
