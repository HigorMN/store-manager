const connection = require('./connection');

const insert = async (arraySales) => {
  await connection.execute('INSERT INTO sales (date) VALUE (NOW())');

  const [[{ saleId }]] = await connection.execute(
    'SELECT MAX(sale_id) AS saleId FROM sales_products',
  );
  
  const id = +saleId + 1;

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