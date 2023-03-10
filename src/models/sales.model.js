const camelize = require('camelize');
const connection = require('./connection');

const insert = async (arraySales) => {
  const [{ insertId: id }] = await connection.execute('INSERT INTO sales (date) VALUE (NOW())');

  const sales = await Promise.all(arraySales.map(async (e) => {
    const { productId, quantity } = e;
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
      [id, productId, quantity],
    );
      return e;
  }));

  return { id, itemsSold: sales };
};

const findAll = async () => {
  const query = `SELECT (sP.sale_id), (s.date), (sP.product_id), (sP.quantity) 
  FROM sales_products AS sP INNER JOIN sales AS s ON s.id = sP.sale_id`;
  const [result] = await connection.execute(query);

  return camelize(result);
};

const findById = async (id) => {
  const query = `SELECT (s.date), (sP.product_id), (sP.quantity)
  FROM sales_products AS sP INNER JOIN sales AS s ON s.id = sP.sale_id WHERE sale_id = ?`;
  const [result] = await connection.execute(query, [id]);

  return camelize(result);
};

const deleteById = async (id) => {
  const query = `DELETE s, sP FROM sales AS s 
  JOIN sales_products AS sP ON s.id = sP.sale_id WHERE s.id = ?`;
  await connection.execute(query, [id]);
};

const updateById = async (saleId, arraySales) => {
  const query1 = 'DELETE sP FROM sales_products AS sP WHERE sale_id = ?';
  const query2 = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)';

  await connection.execute(query1, [saleId]);

  const sales = await Promise.all(arraySales.map(async (e) => {
    const { productId, quantity } = e;
    await connection.execute(query2, [saleId, productId, quantity]);
      return e;
  }));

  return { saleId, itemsUpdated: sales };
};

module.exports = {
  insert,
  findAll,
  findById,
  deleteById,
  updateById,
};