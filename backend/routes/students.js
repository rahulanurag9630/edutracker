const express = require('express');
const router = express.Router();
const students = require('../models/Student'); // Import your student model
const fetchuser = require('../middleware/Fetchuser');
const Assignment = require('../models/Assignment');
const SubmitAssi = require('../models/SubmitAssi');
const UploadNotes = require('../models/UploadNotes')
const Student = require('../models/Student')
const fetchUser = require('../middleware/Fetchuser');
const Attendance = require('../models/Attendance');
const ExamResult = require('../models/ExamResult')
const path = require('path');
const { body, validationResult,query } = require('express-validator');

const multer = require('multer');

router.get('/fetcheStudent/:id', fetchuser, async (req, res) => {
  try {
    const foundStudent = await students.findById(req.params.id);
    if (!foundStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(foundStudent.photo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Route 2: Fetching the Assingnmen Question
router.get('/fetchAssignment', fetchuser, async (req, res) => {
  try {
    const assignment = await Assignment.find();
    if (!assignment) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// Route 3:Submit Assignments///////////////////////////////////////////////////////////////////////

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'uploads', 'assignments')); // Files will be saved in the 'uploads' folder
  },
  filename: (req, file, cb) => {
      const extname = path.extname(file.originalname);
      const basename = path.basename(file.originalname, extname); // Get the original file name without extension
      const filename = `${basename}-${Date.now()}${extname}`;
      cb(null, filename); // Set the filename for the uploaded file (timestamp + original file extension)
  },
});

const upload = multer({ storage }).single('assignment');

router.post('/submitAssignment', fetchUser, async (req, res) => {
  upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
          // A Multer error occurred (e.g., file size limit exceeded)
          console.error('Multer Error:', err);
          return res.status(400).json({ success: false, error: 'File upload failed' });
      } else if (err) {
          // An unknown error occurred
          console.error('Unknown Error:', err);
          return res.status(500).json({ success: false, error: 'Internal server error' });
      }

      try {
          const { name, rollNo, subject } = req.body;
          const assignment = req.file ? req.file.filename : null; // Get the uploaded file name

          const uploads = await SubmitAssi.create({
              name,
              rollNo,
              subject,
              assignment
          })

          res.status(201).json({ success: true, uploads });
      } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, error: 'Internal server error' });
      }
  });
});

//Route : 4 : fetching notes from backend login required//////////////////////////////////////////////////////////////////////////

router.get('/downloadNotes', fetchuser, async (req, res) => {
  try {
    const notes = await UploadNotes.find();
    if (!notes) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

//Route 5 :Fetching Attendance from backend login is required/////////////////////////////////////////////////////////////////////////

router.get('/fetchAttendance',fetchuser,async (req, res)=>{
  try {
    const attendance = await Attendance.find();
    if(!attendance)
    {
      return res.status(404).json({error:'Attendance not found'});
    }
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Route 6 : Fetching the exam result from backend login is required//////////////////////////////////////////////////////////

router.get('/examResult/:rollNo', fetchuser, async (req, res) => {
  try {
    const result = await ExamResult.findOne({ rollNo: req.params.rollNo }); // Correct usage of findOne with a query object
    if (!result) {
      return res.status(404).json({ error: 'Result not found' });
    }
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Route 7: fetch an student detail//////////////////////////////////////////////////////////////////////////////////


router.get(
  '/fetchStudent',
  fetchuser,
  [
    query('rollNo').exists().withMessage('please enter rollNo'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const rollNo = req.query.rollNo;
      const student = await Student.findOne({ rollNo: rollNo });

      if (!student) {
        return res.status(404).json({ success: false, error: 'Student not found' });
      }

      res.json({ success: true, student });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: 'Some error occurred' });
    }
  }
);


module.exports = router;
