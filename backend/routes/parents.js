const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Import your student model
const Notice = require('../models/Notice')
const fetchuser = require('../middleware/Fetchuser');
const { body, validationResult, query } = require('express-validator');


// Route 1 : fetching Students Roll No from respected Parent's Phone numbers



router.get('/fetchRollNo', [
    query('contactNumber').exists().withMessage('Please provide a phone number'),
], fetchuser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const contactNumber = req.query.contactNumber;
            const students = await Student.find({ parentContact: contactNumber });

            // Extract rollNo from the response and send it in the API response
            const rollNumbers = students.map(student => student.rollNo);

            res.json({ rollNumbers }); // Sending rollNumbers array in the response
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Some error occurred');
        }
    });

//Route 2 : View Notices////////////////////////////////////////////////////////////

router.get('/fetcheNotice', fetchuser, [
    query('userType').exists().withMessage('user Type is missing'),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const userType = req.query.userType;
      const notices = await Notice.find({ nFor: userType }); // Await the query execution
      res.json(notices); // Return the result
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Some error occurred');
    }
  });
  
module.exports = router;