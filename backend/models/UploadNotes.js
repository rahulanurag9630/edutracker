const mongoose = require('mongoose');

const uploadNotesSchema = new mongoose.Schema({
    subject:{
        type:String,
        require:true
    },
    subjectCode:{
        type:String,
        require:true
    },
    unit:{
        type:String,
        require: true
    },
    notes: {
        type:String, // Photo stored as a Buffer
      }
});

const UploadNotes = mongoose.model('UploadNotes', uploadNotesSchema);

module.export = UploadNotes;