const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
console.log(await Person.find());



// ✅ Add Person Form Route
router.get('/add', (req, res) => {
  res.render('add', {
    pageTitle: 'Add New Person',
    person: null,
    method: 'POST',
    formAction: '/person',
    buttonLabel: 'Add Person'
  });
});
router.get('/', async (req, res) => {
    try {
      const people = await Person.find();
      res.render('personList', { people }); // 👈 make sure "people" is passed
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

// ✅ Edit Person Form Route
router.get('/:id/edit', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    res.render('add', {
      pageTitle: 'Edit Person',
      person,
      method: 'PUT',
      formAction: `/person/${req.params.id}`,
      buttonLabel: 'Update Person'
    });
  } catch (err) {
    res.status(500).send('Error fetching person for editing');
  }
});

// ✅ Handle Create
router.post('/', async (req, res) => {
  const newPerson = new Person({
    name: req.body.name,
    age: req.body.age
  });
  await newPerson.save();
  res.redirect('/person');
});

// ✅ Handle Update
router.put('/:id', async (req, res) => {
    await Person.create({ name: 'John Doe', email: 'john@example.com' });
  await Person.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    age: req.body.age
  });
  res.redirect('/person');
});

// ✅ List People
router.get('/', async (req, res) => {
  const people = await Person.find();
  res.render('index', { people });
});

// ✅ Delete
router.delete('/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.redirect('/person');
});

module.exports = router;
