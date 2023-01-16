const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services/');
const { allProducts, invalidValue } = require('./mocks/products.service.mock');

describe('Testes de unidade do service de produtos', () => {
  describe('listagem de produtos', () => {
    it('lista todos os produtos', async () => {
      sinon.stub(productsModel, 'findAll').resolves(allProducts);
  
      const result = await productsService.findAll();
  
      expect(result.message).to.deep.equal(allProducts);
    });
  }); -

  describe('Buscando 1 produto', () => {
    it('retorna o produto caso id exista', async () => {
      sinon.stub(productsModel, 'findById').resolves(allProducts[0]);

      const result = await productsService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });

    it('retorna um erro caso o produto não existe', async () => {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await productsService.findById(99999);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    })

    it('retorna um erro caso o id seja inválido', async () => {
      sinon.stub(productsModel, 'findById').resolves('a');
      const result = await productsService.findById(invalidValue);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
  });

  describe('Inserindo 1 produto', () => {
    it('retorna o produto adcionado', async () => {
      sinon.stub(productsModel, 'insert').resolves(1);
      sinon.stub(productsModel, 'findById').resolves(allProducts[0]);

      const result = await productsService.insert('Martelo de Thor');

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });

  describe('Atualizando produto pelo id', () => {
    it('retorno em caso de sucesso', async () => {
      const name = 'Martelo de Thor';
      const id = 1;
      sinon.stub(productsModel, 'updateById').resolves([]);
      
      const result = await productsService.updateById(name, id);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ id: id, name: name });
    });
    it('retorno em caso de produto não encontrado', async () => {
      const name = 'Martelo de Thor';
      const id = 9999;
      sinon.stub(productsService, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      const result = await productsService.updateById(name, id);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  afterEach(function () { sinon.restore() });
});