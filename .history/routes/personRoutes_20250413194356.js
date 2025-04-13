// routes/personRoutes.js

const express = require('express');
const router = express.Router();
const Person = require('../models/person');

// Show list of persons
router.get('/', async (req, res) => {
  const people = await Person.find();
  res.render('personList', { people });
});

module.exports = router;
