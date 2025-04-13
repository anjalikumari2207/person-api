// routes/personRoutes.js
const express = require('express');
const router = express.Router();
const Person = require('../models/person');

// GET /person
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.render('personList', { people }); // 👈 make sure "people" is passed
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
