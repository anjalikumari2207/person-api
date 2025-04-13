const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
console.log(await Person.find());


// ✅ List People
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.render('personList', { people });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// ✅ Add Person Form
router.get('/add', (req, res) => {
  res.render('add', {
    pageTitle: 'Add New Person',
    person: null,
    method: 'POST',
    formAction: '/person',
    buttonLabel: 'Add Person'
  });
});

// ✅ Edit Person Form
router.get('/:id/edit', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    res.render('add', {
      pageTitle: 'Edit Person',
      person,
      method: 'POST', // Use POST with methodOverride('_method') for PUT
      formAction: `/person/${req.params.id}?_method=PUT`,
      buttonLabel: 'Update Person'
    });
  } catch (err) {
    res.status(500).send('Error fetching person for editing');
  }
});

// ✅ Create Person
router.post('/', async (req, res) => {
  const newPerson = new Person({
    name: req.body.name,
    age: req.body.age
  });
  await newPerson.save();
  res.redirect('/person');
});

// ✅ Update Person
router.put('/:id', async (req, res) => {
  await Person.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    age: req.body.age
  });
  res.redirect('/person');
});

// ✅ Delete Person
router.delete('/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.redirect('/person');
});

module.exports = router;
