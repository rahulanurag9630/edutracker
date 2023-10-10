const express = require('express');
const router = express();
const bcrypt = require('bcryptjs')
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Parents = require('../models/Parents');
const path = require('path');
const multer = require('multer');
// here file destination is defined


const JWT_SECRET = 'anurag$boy'

var jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');
const Parent = require('../models/Parents');

// API for creating Teacher////////////////////////////////////////////////////////////////////////////////////////

router.post('/createTeacher', [
    // Validation middleware using express-validator
    body('firstName', 'First name is required').isLength({ min: 1 }),
    body('lastName', 'Last name is required').isLength({ min: 1 }),
    body('email', 'Enter a valid email').isEmail(),
    body('contactNumber', 'Invalid Indian phone number format').matches(/^[6-9]\d{9}$/),
    body('age', 'Age is required').isInt({ min: 1 }),
    body('address', 'Address is required').isLength({ min: 1 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    body('confirmPassword', 'Passwords do not match').custom((value, { req }) => {
        return value === req.body.password;
    }),
    body('gender', 'Invalid gender value').isIn(['Male', 'Female', 'Other']),
    body('qualifications', 'Qualifications are required').isLength({ min: 1 }),
], async (req, res) => {
    let success = false;

    // Check if there are validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // Check whether email exists or not
    try {
        let teacher = await Teacher.findOne({ email: req.body.email });
        if (teacher) {
            return res.status(400).json({ success, error: "Sorry, the teacher already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        teacher = await Teacher.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            age: req.body.age,
            address: req.body.address,
            password: hashedPassword,
            gender: req.body.gender,
            qualifications: req.body.qualifications,
            // You can handle photo field separately if needed
        });

        const data = {
            teacher: {
                id: teacher.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// API for creating Student with his photo////////////////////////////////////////////////////////////////////////////////////

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // The folder where uploaded files will be saved
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        const filename = `${Date.now()}${extname}`;
        cb(null, filename); // Set the filename for the uploaded file
    },
});
const upload = multer({ storage }).single("photo");

router.post('/createStudent', upload, [

    //validate entries
    body('firstName', 'first Name is required').isLength({ min: 1 }),
    body('lastName', 'Last name is required').isLength({ min: 1 }),
    body('email', 'Enter a valid email').isEmail(),
    body('dateOfBirth', 'Date of birth is required').isDate(),
    body('contactNumber', 'Invalid Indian phone number format').matches(/^[6-9]\d{9}$/),
    body('parentContact', 'Invalid Indian phone number format').matches(/^[6-9]\d{9}$/),
    body('address', 'Address is required').isLength({ min: 1 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    body('confirmPassword', 'Passwords do not match').custom((value, { req }) => {
        return value === req.body.password;
    }),
    body('gender', 'Invalid gender value').isIn(['Male', 'Female', 'Other']),

], async (req, res) => {
    let success = false;
    // Check if there are validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    //check whether email exists or not
    try {
        let student = await Student.findOne({ email: req.body.email });
        if (student) {
            return res.status(400).json({ success, error: "Sorry, the student already exists" });
        }
        //handle the uploaded file
        let photoFilename = '';
        if (req.file) {
            photoFilename = req.file.filename;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        student = await Student.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            contactNumber: req.body.contactNumber,
            parentContact: req.body.parentContact,
            address: req.body.address,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            gender: req.body.gender,
            photo: photoFilename, // Store the filename in the student record
        });

        const data = {
            student: {
                id: student.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authToken });
        console.log(authToken);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});


//API for the registration of the parent//////////////////////////////////////////////////////////////////////////////////

router.post('/createParent', [
    // Validation middleware using express-validator
    body('firstName', 'First name is required').isLength({ min: 1 }),
    body('lastName', 'Last name is required').isLength({ min: 1 }),
    body('email', 'Enter a valid email').isEmail(),
    body('contactNumber', 'Invalid Indian phone number format').matches(/^[6-9]\d{9}$/),
    body('address', 'Address is required').isLength({ min: 1 }),
    body('relationWithStudent', 'relationship is required').isLength({ min: 2 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    body('confirmPassword', 'Passwords do not match').custom((value, { req }) => {
        return value === req.body.password;
    }),
    body('gender', 'Invalid gender value').isIn(['Male', 'Female', 'Other']),
], async (req, res) => {
    let success = false;

    //check if there are validation results
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ success, error: error.array() });
    }

    //check if the user is exists

    try {
        let parent = await Parents.findOne({ email: req.body.email });

        if (parent) {
            return res.status(400).json({ error: "sorry this user is already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        parent = await Parents.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            address: req.body.address,
            relationWithStudent: req.body.relationWithStudent,
            password: hashedPassword,
            gender: req.body.gender,
            // You can handle photo field separately if needed
        });

        const data = {
            parents: {
                id: parent.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authToken });
        console.log(authToken);

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }

})

module.exports = router;
