const { Router } = require('express');
const Book = require('../models/Book.js');
const Publisher = require('../models/Publisher.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    const { title, publisher, released } = req.body;
    try {
      const book = await Book.insert({ title, publisher, released });
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
          const pub = await Publisher.getById(book.publisher);

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
  });
