const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// GET /person - list all people
router.get('/', async (req, res) => {
    const people = await Person.find();
    res.render('index', { people });
});

// GET /person/new - form to create a person
router.get('/new', (req, res) => {
    res.render('new');
});

// POST /person - create a person
router.post('/', async (req, res) => {
    await Person.create(req.body);
    res.redirect('/person');
});

// GET /person/:id/edit - form to edit person
router.get('/:id/edit', async (req, res) => {
    const person = await Person.findById(req.params.id);
    res.render('edit', { person });
});

// PUT /person/:id - update person
router.put('/:id', async (req, res) => {
    await Person.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/person');
});

// DELETE /person/:id - delete person
router.delete('/:id', async (req, res) => {
    await Person.findByIdAndDelete(req.params.id);
    res.redirect('/person');
});

module.exports = router;
