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
  });
