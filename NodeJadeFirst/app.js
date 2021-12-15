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
  database: 'webshop-exam'
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



// // get an image (static file) from the public folder - e.g.: /images/cat.jpg
app.use(express.static('public'));

// app.get("/",(req,res) => {
//     pool.getConnection((err, connection) => {
//         if(err) throw err;
//         console.log('connected as id ' + connection.threadId);
//         connection.query('SELECT * from language', (err, rows) => {
//             connection.release(); // return the connection to pool
//             if(err) 
//                 throw err;
//                 console.log('The data from book table are: \n', rows);
//             // else
//                 res.render('language', { languageList: rows, author: 'Kamilla'}); //JSON request
//         });
//     });
// });

// app.get("/customer",(req,res) => {
//     pool.getConnection((err, connection) => {
//         if(err) throw err;
//         console.log('connected as id ' + connection.threadId);
//         connection.query('SELECT * from customer', (err, rows) => {
//             connection.release(); // return the connection to pool
//             if(err) 
//                 throw err;
//                 console.log('The data from customer table are: \n', rows);
//             // else
//                 res.render('customer', { customerList: rows}); //JSON request
//         });
//     });
// });

app.listen(3000, () => {
    console.log('Server is running at port http://localhost:3000/');
});



