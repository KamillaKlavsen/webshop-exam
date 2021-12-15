const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM brand LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

/*get brand id*/
async function getSingle(brandId){
  // const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM brand WHERE brandId=?`, 
    [brandId]
  );
  const data = rows[0];

  return {
    data
  }
}



//POST

async function create(brand){
  const result = await db.query(
    `INSERT INTO brand 
    (BrandName, CreateDate, ModifiedDate, Active) 
    VALUES 
    (?, ?, ?, ?)`, 
    [
      brand.brandname, brand.createdate, brand.modifieddate, brand.active
    ]
  );

  let message = 'Error in creating brand';

  if (result.affectedRows) {
    message = 'brand created successfully';
  }

  return {message};
}

//PUT
async function update(brandId, brand){
  const result = await db.query(
    `UPDATE brand 
    SET brandname=?, createdate=?, modifieddate=?,
    active=?
    WHERE brandId=?`, 
    [
      brand.brandname, brand.createdate,
      brand.modifieddate, brand.active,
      brandId
    ]
  );

  let message = 'Error in updating brand';

  if (result.affectedRows) {
    message = 'brand updated successfully';
  }

  return {message};
}

//DELETE
async function remove(brandId){
  const result = await db.query(
    `DELETE FROM brand WHERE brandId=?`, 
    [brandId]
  );

  let message = 'Error in deleting brand';

  if (result.affectedRows) {
    message = 'brand deleted successfully';
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




