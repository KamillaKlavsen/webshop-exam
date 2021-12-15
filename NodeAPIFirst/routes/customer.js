const express = require('express');
const router = express.Router();
const customer = require('../services/customer');



/* GET */
router.get('/', async function(req, res, next) {
  try {
    res.json(await customer.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting customer `, err.message);
    next(err);
  }
});


//POST
router.post('/', async function(req, res, next) {
  try {
    res.json(await customer.create(req.body));
  } catch (err) {
    console.error(`Error while creating customer`, err.message);
    next(err);
  }
});

//PUT
router.put('/:customerId', async function(req, res, next) {
  try {
    res.json(await customer.update(req.params.customerId, req.body));
  } catch (err) {
    console.error(`Error while updating customer`, err.message);
    next(err);
  }
});

//DELETE
router.delete('/:customerId', async function(req, res, next) {
  try {
    res.json(await customer.remove(req.params.customerId));
  } catch (err) {
    console.error(`Error while deleting customer`, err.message);
    next(err);
  }
});

module.exports = router;