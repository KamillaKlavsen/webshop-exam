const express = require('express');
const router = express.Router();
const brand = require('../services/brand');



/* GET */
router.get('/', async function(req, res, next) {
  try {
    res.json(await brand.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting brand`, err.message);
    next(err);
  }
});

/*Get product id*/
router.get('/:brandId', async function(req, res, next) {
  try {
    res.json(await brand.getSingle(req.params.brandId));
  } catch (err) {
    console.error(`Error while getting brandId`, err.message);
    next(err);
  }
});


//POST
router.post('/', async function(req, res, next) {
  try {
    res.json(await brand.create(req.body));
  } catch (err) {
    console.error(`Error while creating brand`, err.message);
    next(err);
  }
});

//PUT
router.put('/:brandId', async function(req, res, next) {
  try {
    res.json(await brand.update(req.params.brandId, req.body));
  } catch (err) {
    console.error(`Error while updating brand`, err.message);
    next(err);
  }
});

//DELETE
router.delete('/:brandId', async function(req, res, next) {
  try {
    res.json(await brand.remove(req.params.brandId));
  } catch (err) {
    console.error(`Error while deleting brand`, err.message);
    next(err);
  }
});

module.exports = router;