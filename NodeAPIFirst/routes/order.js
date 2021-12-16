const express = require('express');
const router = express.Router();
const order = require('../services/order');






//POST //modtager ordre fra kunden (nanv, email, basketarr)
router.post('/', async function(req, res, next) {
  try {
    res.json(await order.create(req.body));
  } catch (err) {
    console.error(`Error while creating order`, err.message);
    next(err);
  }
});

module.exports = router;