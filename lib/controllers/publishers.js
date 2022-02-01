const { Router } = require('express');
const Publisher = require('../models/Publisher');

module.exports = Router()
  //create
  .post('/', async (req, res, next) => {
    try {
      const publisher = await Publisher.insert({
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
      });
      res.send(publisher);
    } catch (error) {
      next(error);
    }
  })
  //get all
  .get('/', async (req, res, next) => {
    try {
      const publishers = await Publisher.getAll();
      res.send(publishers);
    } catch (error) {
      next(error);
    }
  })
  //get id
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const publisher = await Publisher.getById(id);
      res.send(publisher);
    } catch (error) {
      next(error);
    }
  });
//aaaaahhh
