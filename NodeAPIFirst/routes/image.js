const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const images = require('../services/image');



/* GET */
router.get('/', async function(req, res, next) {
  try {
    res.json(await images.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting image `, err.message);
    next(err);
  }
});


//POST
router.post('/', async function(req, res, next) {
  // try {
  //   res.json(await customer.create(req.body));
  // } catch (err) {
  //   console.error(`Error while creating customer`, err.message);
  //   next(err);
  // }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  console.log(__dirname)

  //Id on image
  uploadPath = __dirname + '/../public/images/' + req.body.productId + '-' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });

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