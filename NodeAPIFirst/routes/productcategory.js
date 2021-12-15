const express = require('express');
const router = express.Router();
const productcategory = require('../services/productcategory');



/* GET */
router.get('/', async function(req, res, next) {
  try {
    res.json(await productcategory.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting productcategory `, err.message);
    next(err);
  }
});


//POST
router.post('/', async function(req, res, next) {
  try {
    res.json(await productcategory.create(req.body));
  } catch (err) {
    console.error(`Error while creating productcategory`, err.message);
    next(err);
  }
});

//PUT
router.put('/:productcategoryId', async function(req, res, next) {
  try {
    res.json(await productcategory.update(req.params.productcategoryId, req.body));
  } catch (err) {
    console.error(`Error while updating productcategory`, err.message);
    next(err);
  }
});

//DELETE
router.delete('/:productcategoryId', async function(req, res, next) {
  try {
    res.json(await productcategory.remove(req.params.productcategoryId));
  } catch (err) {
    console.error(`Error while deleting productcategory`, err.message);
    next(err);
  }
});

module.exports = router;