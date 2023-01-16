const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, productsModel } = require('../../../src/models');

const { salesService } = require('../../../src/services');
const { salesMock, insertMock, findAllMock, findByIdMock } = require('./mocks/sales.service.mock')
describe('Testes de unidade do service de sales', () => {
  it('Inserindo vendas em caso de sucesso', async () => {
    sinon.stub(salesModel, 'insert').resolves(salesMock);

    const result = await salesService.insert(insertMock);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(salesMock);
  });

  it('Inserindo vendas em caso de erro', async () => {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const salesInsert = await salesService.insert([insertMock[0]])

    expect(salesInsert.type).to.equal('PRODUCT_NOT_FOUND');
    expect(salesInsert.message).to.equal('Product not found');
  });

  it('buscando todas as vendas', async () => {
    sinon.stub(salesModel, 'findAll').resolves(findAllMock);

    const result = await salesService.findAll();

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(findAllMock);
  });

  it('buscando venda pelo id valido', async () => {
    sinon.stub(salesModel, 'findById').resolves(findByIdMock);

    const result = await salesService.findById(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(findByIdMock);
  });

  it('buscando venda pelo id inexistente', async () => {
    sinon.stub(salesModel, 'findById').resolves([]);

    const result = await salesService.findById(9999);
    expect(result.type).to.equal('SALE_NOT_FOUND');
    expect(result.message).to.deep.equal('Sale not found');
  });

  it('buscando venda pelo id invalido', async () => {
    sinon.stub(salesModel, 'findById').resolves(undefined);

    const result = await salesService.findById('a');
    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.deep.equal('"id" must be a number');
  })

  it('removendo vendas com id valido', async () => {
    sinon.stub(salesModel, 'deleteById').resolves({});

    const result = await salesService.deleteById(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(null);
  });

  it('removendo vendas com id invalido', async () => {
    sinon.stub(salesService, 'findById')
      .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
    
    const result = await salesService.deleteById(999);

    expect(result.type).to.equal('SALE_NOT_FOUND');
    expect(result.message).to.deep.equal('Sale not found');
  });

  afterEach(function () { sinon.restore() });
});