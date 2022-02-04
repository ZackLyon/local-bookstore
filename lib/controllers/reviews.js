const { Router } = require('express');
const Book = require('../models/Book');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', async (req, res, next) => {
    const result = await Review.insert(req.body);
    res.json(result);
  })
  .get('/', async (req, res, next) => {
    try {
      const result = await Review.getAll();
      const allReviews = await Promise.all(
        result.map(async (review) => {
          const book = await Book.getById(review.book);

          return {
            id: review.id,
            rating: review.rating,
            reviewId: review.reviewId,
            book: { id: book.id, title: book.title },
          };
        })
      );

      res.json(allReviews);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try{
      const review = await Review.getAllByBookId(req.params.id);

      res.json(review);
    } catch(error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const result = await Review.deleteById(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });
