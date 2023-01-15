const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, productsModel } = require('../../../src/models');

const { salesService } = require('../../../src/services/');
const { salesMock, insertMock } = require('./mocks/sales.service.mock')
describe('Testes de unidade do service de sales', () => {
  it('Inserindo sales em caso de sucesso', async () => {
    sinon.stub(salesModel, 'insert').resolves(salesMock);

    const result = await salesService.insert(insertMock);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(salesMock);
  });

  it('Inserindo sales em caso de erro', async () => {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const salesInsert = await salesService.insert([insertMock[0]])

    expect(salesInsert.type).to.equal('PRODUCT_NOT_FOUND');
    expect(salesInsert.message).to.equal('Product not found');
  });

  afterEach(function () { sinon.restore() });
});