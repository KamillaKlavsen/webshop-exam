const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM customer LIMIT ?,?`, 
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

async function create(customer){
  const result = await db.query(
    `INSERT INTO customer 
    (CompanyTypeId, CompanyName, CVR, Name, Address, Zipcode, City
      CountryId, Phone, Email, Comment, 
      CreateDate, ModifiedDate, Active) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [
      customer.companytypeid, customer.companyname, customer.cvr, customer.name, customer.address,
      customer.zipcode, customer.city, customer.countryid,
      customer.phone, customer.email, customer.comment,
      customer.createdate, customer.modifieddate, customer.active
    ]
  );

  let message = 'Error in creating customer';

  if (result.affectedRows) {
    message = 'product created customer';
  }

  return {message};
}

//PUT
async function update(customerId, customer){
  const result = await db.query(
    `UPDATE customer 
    SET companytypeid=?, companyname=?, cvr=?, name=?, address=?, 
    zipcode=?, city=?, countryid=?, phone=?, email=?, comment=?, createdate=?, 
    modifieddate=?, active=?
    WHERE customerId=?`, 
    [
      customer.companytypeid, customer.companyname, customer.cvr, customer.name, customer.address,
      customer.zipcode, customer.city, customer.countryid,
      customer.phone, customer.email, customer.comment,
      customer.createdate, customer.modifieddate, customer.active,
      customerId
    ]
  );

  let message = 'Error in updating customer';

  if (result.affectedRows) {
    message = 'customer updated successfully';
  }

  return {message};
}

//DELETE
async function remove(customerId){
  const result = await db.query(
    `DELETE FROM customer WHERE customerId=?`, 
    [customerId]
  );

  let message = 'Error in deleting customer';

  if (result.affectedRows) {
    message = 'customer deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}




