const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// List all
router.get('/', async (req, res) => {
  const people = await Person.find();
  res.render('personList', { people });
});

// Add form
router.get('/add', (req, res) => {
  res.render('personForm', {
    person: {},
    action: '/person',
    method: 'POST',
    button: 'Add Person'
  });
});

// Create
router.post('/', async (req, res) => {
  await Person.create(req.body);
  res.redirect('/person');
});

// Edit form
router.get('/:id/edit', async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.render('personForm', {
    person,
    action: `/person/${person._id}?_method=PUT`,
    method: 'POST',
    button: 'Update Person'
  });
});

// Update
router.put('/:id', async (req, res) => {
  await Person.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/person');
});

// Delete
router.delete('/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.redirect('/person');
});

module.exports = router;
