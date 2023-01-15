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

module.exports = {
  insert,
};