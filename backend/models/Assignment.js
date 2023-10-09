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
  }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
