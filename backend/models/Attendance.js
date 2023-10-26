const mongoose = require('mongoose');


const students = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  status: {
    type: String, 
    enum: ['Present', 'Absent'],
    required: true,
  },
  remark: {
    type: String, // Change the data type to String
    required: true,
  },
});
const attendanceSchema = new mongoose.Schema({
  date:{
    type:Date,
    default:Date.now
},
  semester: {
    type: String,
    required: true,
  },
  
  students: [students],
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
