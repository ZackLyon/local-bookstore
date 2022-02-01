const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res, next) => {
    const author = await Author.insert({
      name: req.body.name,
      dob: req.body.dob,
      pob: req.body.pob,
    });
    res.json(author);
  })
  .get('/', async (req, res, next) => {
    try {
      const authors = await Author.getAll();
      res.json(authors);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const author = await Author.getById(req.params.id);
      // const authorsBooks = await Book.getByAuthorId(req.params.id);
      // make res.json an object? spread author and add books: authorsBooks somehow.
      res.json(author);
    } catch (e) {
      next(e);
    }
  });

