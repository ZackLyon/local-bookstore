const { Router } = require('express');
const Book = require('../models/Book.js');
const Publisher = require('../models/Publisher.js');
const Review = require('../models/Review.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    const { title, publisher, released } = req.body;
    try {
      const book = await Book.insert({ title, publisher, released });
      const { authorIds } = req.body;
      await Promise.all(authorIds.map(async (id) => book.addAuthorById(id)));
      res.json(book);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const books = await Book.getAll();

      const updatedBooks = await Promise.all(
        books.map(async (book) => {
          const pub = await Publisher.getById(book.publisher.id);

          return {
            id: book.id,
            title: book.title,
            released: book.released,
            publisher: { id: pub.id, name: pub.name },
          };
        })
      );

      res.json(updatedBooks);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try{
      const book = await Book.getById(req.params.id);
      const reviews = await Review.getAllByBookId(req.params.id);
      res.json({ ...book, reviews });
    } catch (error) {
      next(error);
    }
  });
  
