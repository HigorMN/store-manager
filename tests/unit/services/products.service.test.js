const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService: { findAll, findById } } = require('../../../src/services/');
const { allProducts, invalidValue } = require('./mocks/products.service.mock');

describe('Testes de unidade do service de produtos', () => {
  describe('listagem de produtos', () => {
    it('lista todos os produtos', async () => {
      sinon.stub(productsModel, 'findAll').resolves(allProducts);
  
      const result = await findAll();
  
      expect(result.message).to.deep.equal(allProducts);
    });
  }); -

  describe('busca 1 produto', () => {
    it('retorna o produto caso id exista', async () => {
      sinon.stub(productsModel, 'findById').resolves(allProducts[0]);

      const result = await findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });

    it('retorna um erro caso o produto não existe', async () => {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await findById(99999);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    })

    it('retorna um erro caso o id seja inválido', async () => {
      const result = await findById(invalidValue);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
  });

  afterEach(function () { sinon.restore() });
});