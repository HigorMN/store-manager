const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return result;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [product],
  );

  return insertId;
};

const updateById = async (name, id) => {
  const [result] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return result;
};

const deleteById = async (id) => connection.execute(
  'DELETE FROM products WHERE id = ?',
  [id],
);

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  deleteById,
};