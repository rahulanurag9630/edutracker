const mongoose = require('mongoose');

const phoneValidator = (value) => {
  // Define the regex pattern for Indian phone numbers
  const indianPhoneNumberPattern = /^([789]\d{9})$/;
  
  // Use the test method to check if the value matches the pattern
  return indianPhoneNumberPattern.test(value);
};

const studentSchema = new mongoose.Schema({
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
  dateOfBirth: {
    type: Date, 
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
    validate: {
      validator: phoneValidator,
      message: 'Invalid Indian phone number format',
    },
  },
  parentContact:{
    type:String,
    required:true,
    validate: {
      validator: phoneValidator,
      message: 'Invalid Indian phone number format',
    },
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  photo: {
    type:String, // Photo stored as a Buffer
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
