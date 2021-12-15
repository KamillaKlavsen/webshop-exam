const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM productcategory LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

//POST

async function create(productcategory){
  const result = await db.query(
    `INSERT INTO productcategory 
    (ProductCategoryName) 
    VALUES 
    (?)`, 
    [
      productcategory.productcategoryname
    ]
  );

  let message = 'Error in creating productcategory';

  if (result.affectedRows) {
    message = 'productcategory created successfully';
  }

  return {message};
}

//PUT
async function update(productcategoryId, productcategory){
  const result = await db.query(
    `UPDATE productcategory 
    SET productcategoryname=?
    WHERE productcategoryId=?`, 
    [
      productcategory.productcategoryname, productcategoryId
    ]
  );

  let message = 'Error in updating productcategory';

  if (result.affectedRows) {
    message = 'productcategory updated successfully';
  }

  return {message};
}

//DELETE
async function remove(productcategoryId){
  const result = await db.query(
    `DELETE FROM productcategory WHERE productcategoryId=?`, 
    [productcategoryId]
  );

  let message = 'Error in deleting productcategory';

  if (result.affectedRows) {
    message = 'productcategory deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}




