import React ,{useState}from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
 
  const [fileSize, setFileSize] = useState(0); // State variable to store file size
  const [errorMessage, setErrorMessage] = useState(''); // State variable for error message
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 20 * 1024 * 1024; // 20 MB in bytes

    if (selectedFile && selectedFile.size > maxSize) {
      setFileSize(selectedFile.size);
      setErrorMessage('File size exceeds the limit (20 MB). Please select a smaller file.');
    } else {
      setFileSize(0);
      setErrorMessage('');
      onSubmit(selectedFile);
    }
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
              Upload File</label>
              <div className="col-md-6">

                <input
                  type="file"
                  className="form-control"
                  id="notes"
                  name="notes"
                  onChange={handleFileChange}
                  required
                /> 
                {fileSize > 0 && (
                  <div className="text-danger">{`File size: ${(fileSize / (1024 * 1024)).toFixed(2)} MB`}</div>
                )}
                {errorMessage && <div className="text-danger">{errorMessage}</div>}
              </div>
            
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
