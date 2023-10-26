const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  givenDate: {
    type: Date,
    required: true,
  },
  submissionDate: {
    type: Date,
    required: true,
  },
  class:{
    type:String,
    required:true
  },
  questions: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 7, // Automatically delete records after 7 days (in seconds)
  },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
