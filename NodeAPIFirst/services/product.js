const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM product LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

/*get product id*/
async function getSingle(productId){
  // const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM product WHERE productId=?`, 
    [productId]
  );
  const data = rows[0];

  return {
    data
  }
}



//POST

async function create(product){
  const result = await db.query(
    `INSERT INTO product 
    (PartNumber, BrandName, Name, Price, Description, Comment, ProductCategoryId, ImageFile, CreateDate, ModifiedDate, Active) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [
      product.partnumber, product.brandname, product.name, product.price, product.description, product.comment,
      product.productcategoryid, product.imagefile, product.createdate,
      product.modifieddate, product.active
    ]
  );

  let message = 'Error in creating product';

  if (result.affectedRows) {
    message = 'product created successfully';
  }

  return {message};
}

//PUT
async function update(productId, product){
  const result = await db.query(
    `UPDATE product 
    SET partnumber=?, brandname=?, brand name=?, price=?, description=?, comment=?, productcategoryid=?, 
    imagefile=?, createdate=?, modifieddate=?,
    active=?
    WHERE productId=?`, 
    [
      product.partnumber, product.brandname, product.name, product.price, product.description, product.comment,
      product.productcategoryid, product.imagefile, product.createdate,
      product.modifieddate, product.active,
      productId
    ]
  );

  let message = 'Error in updating product';

  if (result.affectedRows) {
    message = 'product updated successfully';
  }

  return {message};
}

//DELETE
async function remove(productId){
  const result = await db.query(
    `DELETE FROM product WHERE productId=?`, 
    [productId]
  );

  let message = 'Error in deleting product';

  if (result.affectedRows) {
    message = 'product deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  getSingle,
  create,
  update,
  remove
}




