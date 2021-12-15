const express = require('express');
const router = express.Router();

//POST
router.post('/', async function(req, res, next) {

      res.send("hello world");
})