const express = require('express');
const router = express();
const Assignment = require('../models/Assignment');
const ExamResult = require('../models/ExamResult');
const Attendance = require('../models/Attendance');
const UploadNotes = require('../models/UploadNotes');
const Student = require('../models/Student');
const Notice = require('../models/Notice');
const path = require('path');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/Fetchuser');






//Route 1 .   Post Assignments by teacher //////////////////////////////////////////////////////////////////////

router.post('/uploadAssignment', fetchUser, [
    body('subject', 'please enter subject').isLength({ min: 1 }),
    body('givenDate', 'please enter valid date').isDate(),
    body('submissionDate', 'please enter valide Date').isDate(),
    body('class', 'please enter valide class').isLength({ min: 1 }),
    body('questions', 'please enter questions').isLength({ min: 1 })

], async (req, res) => {
    let success = false;
    // Check if there are validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let assignment = await Assignment.create({
            subject: req.body.subject,
            givenDate: req.body.givenDate,
            submissionDate: req.body.submissionDate,
            class: req.body.class,
            questions: req.body.questions

        });
        success = true;
        res.json({ success, assignment });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

//Route 2. Fetch all the students for attendance//////////////////////////////////////////////////////

router.get('/fetchAllStudenst', fetchUser, [
    body('semester', 'please select a semester').isLength({ min: 1 })
],

    async (req, res) => {
        // Check if there are validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const students = await Student.find({ currentSem: req.body.semester },);
            

            res.json(students);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occurred");
        }

    });

//Route 3 : Post Notices ///////////////////////////////////////////////////////////////

router.post('/postNotices', fetchUser, [
    body('noticeType', 'Enter a Notice Type').isLength({ min: 1 }),
    body('notice', 'enter Noice').isLength({ min: 2 })
],
    async (req, res) => {
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, erros: errors.array() });
        }
        try {
            const notice = await Notice.create({
                noticeType: req.body.noticeType,
                notice: req.body.notice
            });
            success = true;
            res.json({ success, notice });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occurred");
        }
    });

//Route 4: adding the result of an student//////////////////////////////////////////////////////////

router.post('/submitExamResult', fetchUser, [
    body('studentName').notEmpty().withMessage('Student Name is required'),
    body('rollNo').notEmpty().withMessage('Roll Number is required'),
    body('fatherName').notEmpty().withMessage("father's name is required"),
    body('examDate').notEmpty().withMessage('Exam Date is required').isISO8601().toDate(),
    body('subjects.*.subName').notEmpty().withMessage('Subject Name is required'),
    body('subjects.*.subCode').notEmpty().withMessage('Subject Code is required'),
    body('subjects.*.totalMarks')
        .notEmpty()
        .withMessage('Total Marks is required')
        .isInt({ min: 0 })
        .withMessage('Total Marks must be a positive integer'),
    body('subjects.*.obtainedMarks')
        .notEmpty()
        .withMessage('Obtained Marks is required')
        .isInt({ min: 0 })
        .withMessage('Obtained Marks must be a positive integer'),
],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Create a new ExamResult document
            const examResult = new ExamResult({
                studentName: req.body.studentName,
                rollNo: req.body.rollNo,
                fatherName:req.body.fatherName,
                examDate: req.body.examDate,
                subjects: req.body.subjects
            });

            // Save the document to the database
            await examResult.save();

            res.status(201).json({ message: 'Exam result submitted successfully', examResult });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
);

//Route 5 : uploading the notes///////////////////////////////////////////////////////////////

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads', 'notes')); // Files will be saved in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extname); // Get the original file name without extension
        const filename = `${basename}-${Date.now()}${extname}`;
        cb(null, filename); // Set the filename for the uploaded file (timestamp + original file extension)
    },
});

// Multer upload configuration
const upload = multer({ storage }).single('notes');

router.post('/uploadNotes', fetchUser, async (req, res) => {
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
            const { subject, subjectCode, unit } = req.body;
            const notes = req.file ? req.file.filename : null; // Get the uploaded file name

            const uploads = await UploadNotes.create({
                subject,
                subjectCode,
                unit,
                notes
            })

            res.status(201).json({ success: true, uploads });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    });
});

module.exports = router;