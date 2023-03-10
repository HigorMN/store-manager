const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products } = require('./mocks/products.model.mock');

describe('Testes de unidade do model de produtos', () => {
  it('Lista todos os produtos', async () => {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModel.findAll();

    expect(result).to.be.deep.equal(products);
  });

  it('Procura um produto a partir do seu id', async () => {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const result = await productsModel.findById(1);

    expect(result).to.be.deep.equal(products[0]);
  });

   it('Inserindo um produto', async () => {
    sinon.stub(connection, 'execute').resolves([ { insertId: 1 }]);

    const insertId = await productsModel.insert('ProdutoX');

    expect(insertId).to.equal(1);
   });
  
  it('Atualizando produto pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([]);

    const result = await productsModel.updateById('Martelo', 1);

    expect(result).to.be.deep.equal(result);
  })

  it('Removendo produto pelo id', async () => {
    sinon.stub(connection, 'execute').resolves({});

    await productsModel.deleteById(1);
  });

  afterEach(sinon.restore);
});