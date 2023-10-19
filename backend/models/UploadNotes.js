const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadNotesSchema = new Schema({
  // Define your schema fields here
  subject: String,
  subjectCode: String,
  unit: String,
  notes: String // Assuming notes is a string in your schema
});

const UploadNotes = mongoose.model('UploadNotes', uploadNotesSchema);
module.exports = UploadNotes;
