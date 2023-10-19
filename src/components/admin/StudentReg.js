


// import { useNavigate } from "react-router-dom";

// import React, { useState } from 'react';
// import axios from 'axios';

// function StudentForm() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     dateOfBirth: '',
//     contactNumber: '',
//     parentContact: '',
//     address: '',
//     password: '',
//     confirmPassword: '',
//     gender: 'Male', // Default value
//     photo: null,
//     currentSem: '',
//     rollNo: ''
//   });

//   const handleFormChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleFileChange = (event) => {
//     setFormData({
//       ...formData,
//       photo: event.target.files[0],
//     });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/createStudent', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//       });

//       console.log(response.data);
//       // Handle success, redirect or show a success message
//     } catch (error) {
//       console.error(error);
//       // Handle error, show error message to the user
//     }
//   };
//   const [errors, setErrors] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     dateOfBirth: '',
//     contactNumber: '',
//     parentContact: '',
//     address: '',
//     password: '',
//     confirmPassword: '',
//     currentSem: '',
//     rollNo: ''
//   });

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = { ...errors };

//     // Validation rules
//     const phonePattern = /^[6-9]\d{9}$/;
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     // Validate each field and set error messages
//     if (!formData.firstName.trim()) {
//       newErrors.firstName = 'First name is required';
//       valid = false;
//     }

//     if (!formData.lastName.trim()) {
//       newErrors.lastName = 'Last name is required';
//       valid = false;
//     }

//     if (!formData.email.trim() || !emailPattern.test(formData.email)) {
//       newErrors.email = 'Enter a valid email';
//       valid = false;
//     }

//     if (!formData.dateOfBirth) {
//       newErrors.dateOfBirth = 'Date of birth is required';
//       valid = false;
//     }

//     if (!formData.contactNumber.trim() || !phonePattern.test(formData.contactNumber)) {
//       newErrors.contactNumber = 'Invalid Indian phone number format';
//       valid = false;
//     }

//     if (!formData.parentContact.trim() || !phonePattern.test(formData.parentContact)) {
//       newErrors.parentContact = 'Invalid Indian phone number format';
//       valid = false;
//     }

//     if (!formData.address.trim()) {
//       newErrors.address = 'Address is required';
//       valid = false;
//     }

//     if (formData.password.length < 5) {
//       newErrors.password = 'Password must be at least 5 characters long';
//       valid = false;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//       valid = false;
//     }

//     if (!formData.currentSem.trim()) {
//       newErrors.currentSem = 'Enter current semester';
//       valid = false;
//     }

//     if (!formData.rollNo.trim()) {
//       newErrors.rollNo = 'Roll number is required';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   return (
//     <div className="container mt-3">
//       <div className="card">
//         <div className="card-header">
//           <h2 className="text-center">Student Registration</h2>
//         </div>
//         <div className="card-body">
//           <form onSubmit={handleFormSubmit}>
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label htmlFor="firstName" className="form-label">First Name</label>
//                 <input type="text" className={`form-control ${errors.firstName && 'is-invalid'}`} name="firstName" id="firstName" onChange={handleFormChange} required />
//                 {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
//               </div>
//               <div className="col-md-6">
//                 <label htmlFor="lastName" className="form-label">Last Name</label>
//                 <input type="text" className={`form-control ${errors.lastName && 'is-invalid'}`} name="lastName" id="lastName" onChange={handleFormChange} required />
//                 {errors.firstName && <div className="invalid-feedback">{errors.lastName}</div>}
//               </div>
//             </div>
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label htmlFor="email" className="form-label">Email</label>
//                 <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} name="email" id="email" onChange={handleFormChange} required />
//               </div>
//               <div className="col-md-6">
//                 <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
//                 <input type="date" className={`form-control ${errors.firstName && 'is-invalid'}`} name="dateOfBirth" id="dateOfBirth" onChange={handleFormChange} required />
//               </div>
// </div>
// <div className="row mb-3">
//   <div className="col-md-6">
//     <label htmlFor="contactNumber" className="form-label">Contact Number</label>
//     <input type="tel" className={`form-control ${errors.contactNumber && 'is-invalid'}`} name="contactNumber" id="contactNumber" onChange={handleFormChange} required />
//   </div>
//   <div className="col-md-6">
//     <label htmlFor="parentContact" className="form-label">Parent Contact Number</label>
//     <input type="tel" className={`form-control ${errors.parentContact && 'is-invalid'}`} name="parentContact" id="parentContact" onChange={handleFormChange} required />
//   </div>
// </div>
// <div className="row mb-3">
//   <div className="col-md-6">
//     <label htmlFor="address" className="form-label">Address</label>
//     <input type="text" className={`form-control ${errors.address && 'is-invalid'}`} name="address" id="address" onChange={handleFormChange} required />
//   </div>
//   <div className="col-md-6">
//     <label htmlFor="password" className="form-label">Password</label>
//     <input type="password" className={`form-control ${errors.password && 'is-invalid'}`} name="password" id="password" onChange={handleFormChange} required />
//   </div>
// </div>
// <div className="row mb-3">
//   <div className="col-md-6">
//     <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//     <input type="password" className={`form-control ${errors.confirmPassword && 'is-invalid'}`} name="confirmPassword" id="confirmPassword" onChange={handleFormChange} required />
//   </div>
//   <div className="col-md-6">
//     <label htmlFor="gender" className="form-label">Gender</label>
//     <select className="form-select" name="gender" id="gender" onChange={handleFormChange} required>
//       <option value="">Select Gender</option>
//       <option value="Male">Male</option>
//       <option value="Female">Female</option>
//       <option value="Other">Other</option>
//     </select>
//   </div>
// </div>
            // <div className="row mb-3">
            //   <div className="col-md-6">
            //     <label htmlFor="photo" className="form-label">Photo</label>
            //     <input type="file" className="form-control" name="photo" id="photo" onChange={handleFileChange} required />
            //   </div>
            //   <div className="col-md-6">
            //     <label htmlFor="currentSem" className="form-label">Current Semester</label>
            //     <input type="text" className={`form-control ${errors.currentSem && 'is-invalid'}`} name="currentSem" id="currentSem" onChange={handleFormChange} required />
            //   </div>
            // </div>
            // <div className="row mb-3">
            //   <div className="col-md-6">
            //     <label htmlFor="rollNo" className="form-label">Roll Number</label>
            //     <input type="text" className={`form-control ${errors.rollNo && 'is-invalid'}`} name="rollNo" id="rollNo" onChange={handleFormChange} required />
            //   </div>
            //   <div className="col-md-6">
            //     {/* Add any additional fields here */}
            //   </div>
            // </div>
//             <button type="submit" className="btn btn-primary">Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StudentForm;



/////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import axios from 'axios';

function StudentForm() {
  const port = process.env.PORT;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    contactNumber: '',
    parentContact: '',
    address: '',
    password: '',
    confirmPassword: '',
    gender: 'Male', // Default value
    photo: null,
    currentSem: '',
    rollNo: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    contactNumber: '',
    parentContact: '',
    address: '',
    password: '',
    confirmPassword: '',
    currentSem: '',
    rollNo: ''
  });

  // Update the form data when input fields change
  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    // Clear the related error when user starts typing
    setErrors({ ...errors, [event.target.name]: '' });
  };

  // Update the form data when file input changes
  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      photo: event.target.files[0],
    });
  };

  // Validate the form and handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
   console.log(errors);
    // Validate the form
    const isValid = validateForm();

    if (isValid) {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      try {
        // Make API request
        const response = await axios.post('http://localhost:5000/api/auth/createStudent', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response.data);
        // Handle success, redirect or show a success message
      } catch (error) {
        console.error(error);
        // Handle error, show error message to the user
      }
    }
  };

  // Validate the form fields
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validation rules
    const phonePattern = /^[6-9]\d{9}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate each field and set error messages
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    if (!formData.email.trim() || !emailPattern.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
      valid = false;
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
      valid = false;
    }

    if (!formData.contactNumber.trim() || !phonePattern.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Invalid Indian phone number format';
      valid = false;
    }

    if (!formData.parentContact.trim() || !phonePattern.test(formData.parentContact)) {
      newErrors.parentContact = 'Invalid Indian phone number format';
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    if (formData.password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters long';
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (!formData.currentSem.trim()) {
      newErrors.currentSem = 'Enter current semester';
      valid = false;
    }

    if (!formData.rollNo.trim()) {
      newErrors.rollNo = 'Roll number is required';
      valid = false;
    }

    // Set the errors state to highlight the invalid fields
    setErrors(newErrors);
    return valid;
  };

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header">
          <h2 className="text-center">Student Registration</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className={`form-control ${errors.firstName && 'is-invalid'}`} name="firstName" id="firstName" onChange={handleFormChange} required />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className={`form-control ${errors.lastName && 'is-invalid'}`} name="lastName" id="lastName" onChange={handleFormChange} required />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} name="email" id="email" onChange={handleFormChange} required />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                <input type="date" className={`form-control ${errors.date && 'is-invalid'}`} name="dateOfBirth" id="dateOfBirth" onChange={handleFormChange} required />
                {errors.date && <div className="invalid-feedback">{errors.date}</div>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                <input type="tel" className={`form-control ${errors.contactNumber && 'is-invalid'}`} name="contactNumber" id="contactNumber" onChange={handleFormChange} required />
                {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}

              </div>
              <div className="col-md-6">
                <label htmlFor="parentContact" className="form-label">Parent Contact Number</label>
                <input type="tel" className={`form-control ${errors.parentContact && 'is-invalid'}`} name="parentContact" id="parentContact" onChange={handleFormChange} required />
                {errors.parentContact && <div className="invalid-feedback">{errors.parentContact}</div>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className={`form-control ${errors.address && 'is-invalid'}`} name="address" id="address" onChange={handleFormChange} required />
                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className={`form-control ${errors.password && 'is-invalid'}`} name="password" id="password" onChange={handleFormChange} required />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input type="password" className={`form-control ${errors.confirmPassword && 'is-invalid'}`} name="confirmPassword" id="confirmPassword" onChange={handleFormChange} required />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select className="form-select" name="gender" id="gender" onChange={handleFormChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="photo" className="form-label">Photo</label>
                <input type="file" className="form-control" name="photo" id="photo" onChange={handleFileChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="currentSem" className="form-label">Current Semester</label>
                <input type="text" className={`form-control ${errors.currentSem && 'is-invalid'}`} name="currentSem" id="currentSem" onChange={handleFormChange} required />
                {errors.currentSem && <div className="invalid-feedback">{errors.currentSem}</div>}

              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="rollNo" className="form-label">Roll Number</label>
                <input type="text" className={`form-control ${errors.rollNo && 'is-invalid'}`} name="rollNo" id="rollNo" onChange={handleFormChange} required />
                {errors.rollNo && <div className="invalid-feedback">{errors.rollNo}</div>}

              </div>
              <div className="col-md-6">
                {/* Add any additional fields here */}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
