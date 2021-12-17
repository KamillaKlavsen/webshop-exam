const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.set("view engine","jade")
// app.use(cors());


const pool = mysql.createPool({
  host: 'localhost',
  user: 'kbk',
  password: 'pw123456',
  database: 'new-webshop-exam'
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



// // get an image (static file) from the public folder - e.g.: /images/cat.jpg
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server is running at port http://localhost:3000/');
});



