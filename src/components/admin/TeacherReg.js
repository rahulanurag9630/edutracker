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

import React, { useState } from 'react';
import axios from 'axios';

const TeacherReg = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${port}/api/auth/createTeacher`, formData);
      console.log(response.data);
      navigate('/ahome');
      // Handle success, redirect user, or show a success message
    } catch (error) {
      console.error(error.response.data);
      // Handle error, show error message to the user
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Teacher Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="firstName" name="firstName" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="lastName" name="lastName" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="contactNumber" className="form-label">Contact Number</label>
          <input type="tel" className="form-control" id="contactNumber" name="contactNumber" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input type="number" className="form-control" id="age" name="age" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" name="address" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={handleChange} required />
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
