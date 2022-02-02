const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', async (req, res) => {
    const { name, company } = req.body;
    const result = await Reviewer.insert({ name, company });
    res.json(result);
  })
  .get('/', async (req, res) => {
    const result = await Reviewer.getAll();
    res.json(result);
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Reviewer.getById(id);
    res.json(result);
  })
  .patch('/:id', async (req, res) => {
    const { id } = req.params;
    const attributes = req.body;
    const result = await Reviewer.updateById(id, attributes);
    res.json(result);
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Reviewer.deleteById(id);
    res.json(result);
  });
