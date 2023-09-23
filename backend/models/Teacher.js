// Import Mongoose
const mongoose = require('mongoose');

// phone number validator
const phoneValidator = (value) => {
    // Define the regex pattern for Indian phone numbers
    const indianPhoneNumberPattern = /^([789]\d{9})$/;
    
    // Use the test method to check if the value matches the pattern
    return indianPhoneNumberPattern.test(value);
  };
// Define the Teacher Schema
const teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String,
    required: true,
    validate: {
      validator: phoneValidator,
      message: 'Invalid Indian phone number format',
    },
  },
  age:{
    type:Number,
    require:true,
  },
  address:{
    type:String,
    require:true
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword:{
    type:String,
    require:true

  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // Valid gender values
    required: true,
  },
  // Other teacher-specific fields (e.g., qualifications, contact info)
  qualifications: {
    type: String,
    required: true,
  },
  // Photo field as a Buffer to store image data
  photo: {
    type: Buffer,
  },
});

// Create a Teacher model from the schema
const Teacher = mongoose.model('Teacher', teacherSchema);

// Export the Teacher model
module.exports = Teacher;
