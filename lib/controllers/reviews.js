const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router().post('/', async (req, res, next) => {
  const result = await Review.insert(req.body);
  res.json(result);
});
