const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subName: {
    type: String,
    required: true,
  },
  subCode: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  obtainedMarks: {
    type: Number,
    required: true,
  },
});

const examResultSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  fatherName:{
    type:String,
    required:true
  },
  examDate: {
    type: Date,
    required: true,
  },
  subjects: [subjectSchema],
});

const ExamResult = mongoose.model('ExamResult', examResultSchema);

module.exports = ExamResult;
