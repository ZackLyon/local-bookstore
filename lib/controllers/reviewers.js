const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const { name, company } = req.body;
      const result = await Reviewer.insert({ name, company });
      res.json(result);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const result = await Reviewer.getAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Reviewer.getById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const attributes = req.body;
      const result = await Reviewer.updateById(id, attributes);
      res.json(result);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Reviewer.deleteById(id);

      res.json(result);
    } catch (error) {
      next(error);
    }
  });
