const express = require('express');
const router = express.Router();
const students = require('../models/Student'); // Import your student model

router.get('/fetcheStudent/:id', async (req, res) => {
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

module.exports = router;
