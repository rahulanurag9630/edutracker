const express = require('express');
const router = express();
const bcrypt = require('bcryptjs')
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Parents = require('../models/Parents');
const Admin = require('../models/Admin');
const Help = require('../models/Help');
const path = require('path');
const multer = require('multer');
// here file destination is defined 


const JWT_SECRET = process.env.JWT_SECRET;

var jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');

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
        cb(null, path.join(__dirname, '..', 'uploads')); // Files will be saved in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        const filename = `${Date.now()}${extname}`;
        cb(null, filename); // Set the filename for the uploaded file (timestamp + original file extension)
    },
});

// Multer upload configuration
const upload = multer({ storage }).single('photo');

// API endpoint for creating a student
router.post('/createStudent', (req, res) => {
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
            const { firstName, lastName, email, dateOfBirth, contactNumber, parentContact, address, password, confirmPassword, gender, currentSem, rollNo } = req.body;
            const photo = req.file ? req.file.filename : null; // Get the uploaded file name

            // Hash the password with bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);

            const student = await Student.create({
                firstName,
                lastName,
                email,
                dateOfBirth,
                contactNumber,
                parentContact,
                address,
                password: hashedPassword, // Store the hashed password in the database
                confirmPassword: hashedPassword, // You might want to validate this separately if needed
                gender,
                photo,
                currentSem,
                rollNo,
            });

            res.status(201).json({ success: true, student });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    });
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
//Register the admin  ////////////////////////////////////////////////////////////////////////////
router.post('/createAdmin', [
    body('firstName', 'First name is required').isLength({ min: 1 }),
    body('lastName', 'Last name is required').isLength({ min: 1 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'valid password').isLength({ min: 5 })
], async (req, res) => {
    let success = false;

    //check if there are validation results
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ success, error: error.array() });
    }
    try {
        let admin = await Admin.findOne({ email: req.body.email });

        if (admin) {
            return res.status(400).json({ error: "sorry this user is already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        admin = await Admin.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            // You can handle photo field separately if needed
        });

        const data = {
            admins: {
                id: admin.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authToken });
        console.log(authToken);

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred 1");
    }
})
//Login the Users based on there User Type////////////////////////////////////////////////////////

router.post('/login', [
    body('userType', 'please enter valid user type').exists(),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password can not be blank').exists()

], async (req, res) => {
    let success = false
    //if there are error the return bad request and errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userType, email, password } = req.body;

    try {
        if (userType === 'Teacher') {
            let user = await Teacher.findOne({ email })
            if (!user) {
                success = false;
                return res.status(400).json({ success, error: "please login with right credentials" });
            }

            const comparePassword = await bcrypt.compare(password, user.password);

            if (!comparePassword) {
                success = false;
                return res.status(400).json({ success, error: "please login with right credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET)
            success = true;
            const id = user.id;
            res.json({ success, authToken, id, userType });
        }
        else if (userType === 'Student') {
            let user = await Student.findOne({ email })
            if (!user) {
                success = false;
                return res.status(400).json({ success, error: "please login with right credentials" });
            }

            const comparePassword = await bcrypt.compare(password, user.password);

            if (!comparePassword) {
                success = false;
                return res.status(400).json({ success, error: "please login with right credentials" });
            }
            const data = {
                user: {
                    id: user.id,
                    name: user.firstName + ' ' + user.lastName,
                    rollNo: user.rollNo
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET)
            success = true;
            const id = user.id;
            const name = data.user.name;
            const rollNo = user.rollNo
            res.json({ success, authToken, id, userType, name, rollNo });

        }
        else if (userType === 'Parent') {
            let user = await Parents.findOne({ email })
            if (!user) {
                success = false;
                return res.status(400).json({ success, error: "please login with right credentials" });
            }

            const comparePassword = await bcrypt.compare(password, user.password);

            if (!comparePassword) {
                success = false;
                return res.status(400).json({ success, error: "please login with right credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET)
            success = true;
            const id = user.id;
            const contactNumber = user.contactNumber
            res.json({ success, authToken, id, userType,contactNumber });

        }
        else if (userType === 'Admin') {
            let user = await Admin.findOne({ email })
            if (!user) {
                success = false;
                return res.status(400).json({ success, error: "please login with right credentials" });
            }

            const comparePassword = await bcrypt.compare(password, user.password);

            if (!comparePassword) {
                success = false;
                return res.status(400).json({ success, error: "please login with right credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET)
            success = true;
            const id = user.id;
            res.json({ success, authToken, id, userType });

        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})
// Route x Teache login seperatly
router.post('/tlogin', [

    body('email', 'enter a valid email').isEmail(),
    body('password', 'password can not be blank').exists()

], async (req, res) => {
    let success = false
    //if there are error the return bad request and errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        let user = await Teacher.findOne({ email })
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "please login with right credentials" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            success = false;
            return res.status(400).json({ success, error: "please login with right credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const userType = 'Teacher';
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        const id = user.id;
        res.json({ success, authToken, id, userType });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

}) 


//Route : Help desk Login required///////////////////////////////////////
router.post('/help', [
    body('name', 'name is required').exists(),
    body('email', 'email is required').isEmail(),
    body('message', 'write your query').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, message } = req.body;
            const help = await Help.create({
                name,
                email,
                message
            })

            res.status(201).json({ success: true, help });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error");
        }

    });
// Route x ; fetch queries/////////////////////////////////////////
router.get('/fetchQueries',async(req,res)=>{
    try {
        const response = await Help.find();
        res.json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})

module.exports = router;
