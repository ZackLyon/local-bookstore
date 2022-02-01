const { Router } = require('express');
const Publisher = require('../services/Publisher');



module.exports = Router()
//create
  .post('/', async (req, res) => {
      try{
    const publisher = await Publisher.insert({
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country
    });
    res.send(publisher);
    } catch (error){
    next(error);
    }
  })