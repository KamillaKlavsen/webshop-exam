const db = require('./db');
const helper = require('../helper');
const config = require('../config');

//POST

async function create(order){
  console.log(order)
  // return {
  //   test: 'test'
  // };
  
  const result = await db.query(
      'INSERT INTO `order`(`CustomerName`, `CustomerEmail`, `Basketarr`) VALUES (?, ?, ?)', 
    [order.CustomerName, order.CustomerEmail, order.Basketarr]

  );

  let message = 'Error in creating order';

  if (result.affectedRows) {
    message = 'order created successfully';
  }

  return {message};
}


module.exports = {
  create
 
}




