const express = require('express');
const router = express.Router();
const product = require('../services/product');



/* GET */
router.get('/', async function(req, res, next) {
  try {
    res.json(await product.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting product `, err.message);
    next(err);
  }
});

/*Get product id*/
router.get('/:productId', async function(req, res, next) {
  try {
    res.json(await product.getSingle(req.params.productId));
  } catch (err) {
    console.error(`Error while getting product `, err.message);
    next(err);
  }
});


//POST
router.post('/', async function(req, res, next) {
  try {
    res.json(await product.create(req.body));
  } catch (err) {
    console.error(`Error while creating product`, err.message);
    next(err);
  }
});

//PUT
router.put('/:productId', async function(req, res, next) {
  try {
    res.json(await product.update(req.params.productId, req.body));
  } catch (err) {
    console.error(`Error while updating product`, err.message);
    next(err);
  }
});

//DELETE
router.delete('/:productId', async function(req, res, next) {
  try {
    res.json(await product.remove(req.params.productId));
  } catch (err) {
    console.error(`Error while deleting product`, err.message);
    next(err);
  }
});

module.exports = router;