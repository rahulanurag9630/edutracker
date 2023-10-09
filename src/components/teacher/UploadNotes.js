import React from 'react';
// eslint-disable-next-line no-unused-vars
import BluePatti from '../../assets/BluePatti.css';

const UploadNotes = () => {
  return (
    <div className="container my-5">
      <div className="heading-bar text-center bg-primary py-2 mb-3">
        <h2 className="text-white">Upload Notes</h2>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="subject" className="form-label">Subject:</label>
          <input type="text" className="form-control" id="subject" name="subject" />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="subjectCode" className="form-label">Subject Code:</label>
          <input type="text" className="form-control" id="subjectCode" name="subjectCode" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="unit" className="form-label">Unit:</label>
          <input type="text" className="form-control" id="unit" name="unit" />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="file" className="form-label">File:</label> 
          <input type="file" className="form-control" id="file" name="file" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
          <button className="btn btn-primary">Upload</button>
        </div>
      </div>
    </div>
  );
};

export default UploadNotes;
