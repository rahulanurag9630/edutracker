import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onSubmit(file);
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Submit Assignment</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <label className="btn btn-primary">
              Upload File
              <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
            </label>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
