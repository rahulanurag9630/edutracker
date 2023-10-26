const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmittedAssignmentSchema = new Schema({
    // Define your schema fields here
    name: String,
    rollNo: String,
    subject: String,
    assignment: String // Assuming notes is a string in your schema
  });
  
  const SubmittedAssi = mongoose.model('SubmitAssi', SubmittedAssignmentSchema);
  module.exports = SubmittedAssi;

