const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
.post('/', async (req, res) => {
    const { name, company } = req.body;
    const result = Reviewer.insert({ name, company });
    res.json(result);
})
.get('/', async (req, res) => {
    const result = Reviewer.getAll();
    res.json(result);
})
.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = Reviewer.getById(id);
    res.json(result);
})
.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const result = Reviewer.updateById(id);
    res.json(result);
})
.delete('/:id', async (req, res) {
    const { id } = req.params;
    const result = Reviewer.deleteById(id);
    res.json(result);
});