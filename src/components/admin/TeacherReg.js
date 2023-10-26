// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function TeacherReg() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     contactNumber: '',
//     age: '',
//     address: '',
//     password: '',
//     confirmPassword: '',
//     gender: 'Male', // Default gender value
//     qualifications: '',
//   });
//   const handleInputChange = (e)=>{
//     setFormData({...formData, [e.target.name]: e.target.value})
// };

//   const handleSubmit = async (e) => {
//     const {firstname,lastName,email,contactNumber,age,address,password,gender,qualifications}=formData;
//     e.preventDefault();
//     // API call with formData
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/createTeacher', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({firstname,lastName,email,contactNumber,age,address,password,gender,qualifications}),
//       });

//       const json = await response.json();
//       if (json.success) {
//         //redirect and save the auth token
//         navigate('/ahome');
//         localStorage.setItem('token', json.authToken); // Save the token in localStorage
//         console.log('Successfully registered');
//       } else {
//         // Handle registration failure
//         console.log('Registration failed');
//         console.log(formData)
//         console.log(json);
//       }
//     } catch (error) {
//       // Handle API call error
//       console.error('Error during registration:', error);
//     }
//   };

//   return (
//     <div className="container mt-3">
//       <form onSubmit={handleSubmit}>
//         <div className="row jumbotron box8">
//           <div className="col-sm-12 mx-t3 mb-4">
//             <h2 className="text-center text-info">Teacher Registration Form</h2>
//           </div>
//           <div className="col-sm-6 form-group">
//             <label htmlFor="firstName">First Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="firstName"
//               id="firstName"
//               placeholder="Enter your first name."
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="col-sm-6 form-group">
//             <label htmlFor="lastName">Last Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="lastName"
//               id="lastName"
//               placeholder="Enter your last name."
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="col-sm-6 form-group">
//             <label htmlFor="age">Age</label>
//             <input
//               type="number"
//               name="age"
//               className="form-control"
//               id="age"
//               placeholder="Enter your age"
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="col-sm-6 form-group">
//             <label htmlFor="address">Address</label>
//             <input
//               type="text"
//               className="form-control"
//               name="address"
//               id="address"
//               placeholder="Enter your address"
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="col-sm-6 form-group">
//             <label htmlFor="gender">Gender</label>
//             <select
//               id="gender"
//               name="gender"
//               className="form-control"
//               onChange={handleInputChange}
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="col-sm-6 form-group">
//             <label htmlFor="contactNumber">Phone</label>
//             <input
//               type="tel"
//               name="contactNumber"
//               className="form-control"
//               id="contactNumber"
//               placeholder="Enter Your Contact Number."
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="col-sm-6 form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               id="email"
//               placeholder="Enter your email."
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="col-sm-6 form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               id="password"
//               placeholder="Enter your password."
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="col-sm-6 form-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               className="form-control"
//               id="confirmPassword"
//               placeholder="Re-enter your password."
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="col-sm-6 form-group">
//             <label htmlFor="qualifications">Qualification</label>
//             <input
//               type="text"
//               name="qualifications"
//               className="form-control"
//               id="qualifications"
//               placeholder="Enter your qualification"
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="col-sm-12 form-group mb-0">
//             <button className="btn btn-primary float-right" id="b" type="submit">
//               Submit
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default TeacherReg;


import { useNavigate } from "react-router-dom";

import React, { useState,useEffect } from 'react';
import axios from 'axios';

const TeacherReg = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const port = process.env.PORT;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    age: '',
    address: '',
    password: '',
    confirmPassword: '',
    gender: 'Male', // Default gender value
    qualifications: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: '',

  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the related error when user starts typing
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      try {
        const response = await axios.post(`${port}/api/auth/createTeacher`, formData);
        console.log(response.data);
        navigate('/ahome');
        // Handle success, redirect user, or show a success message
      } catch (error) {
        console.error(error.response.data);
        // Handle error, show error message to the user
      }
    }
  };

  //////////////////////////////////////
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
    setErrors(newErrors);
    return valid;

  }

  /// const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      // If user is not logged in, redirect to home page
      navigate('/');
    }
  }, [isLoggedIn,navigate]);

  // If user is not authenticated, do not render the component
  if (!isLoggedIn) {
    return null;
  }


    return (
      <div className="container mt-5" style={{ backgroundColor: '#ECDBBA', marginTop: '5vh' }}>
        <h2 className="mb-4">Teacher Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className={`form-control ${errors.firstName && 'is-invalid'}`} id="firstName" name="firstName" onChange={handleChange} required />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}

          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className={`form-control ${errors.lastName && 'is-invalid'}`} id="lastName" name="lastName" onChange={handleChange} required />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}


          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} id="email" name="email" onChange={handleChange} required />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}

          </div>
          <div className="mb-3">
            <label htmlFor="contactNumber" className="form-label">Contact Number</label>
            <input type="tel" className={`form-control ${errors.contactNumber && 'is-invalid'}`} id="contactNumber" name="contactNumber" onChange={handleChange} required />
            {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}

          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age</label>
            <input type="number" className="form-control" id="age" name="age" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className={`form-control ${errors.address && 'is-invalid'}`} id="address" name="address" onChange={handleChange} required />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}

          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className={`form-control ${errors.password && 'is-invalid'}`} id="password" name="password" onChange={handleChange} required />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}

          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className={`form-control ${errors.confirmPassword && 'is-invalid'}`} id="confirmPassword" name="confirmPassword" onChange={handleChange} required />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}

          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select className="form-control" id="gender" name="gender" onChange={handleChange} required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="qualifications" className="form-label">Qualifications</label>
            <input type="text" className="form-control" id="qualifications" name="qualifications" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    );
  
};

export default TeacherReg;
