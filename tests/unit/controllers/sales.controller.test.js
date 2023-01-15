const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { salesError, salesSucess, findAllMock, findByIdMock } = require('./mocks/sales.controller.mock');

describe('Testes de unidade do controller sales', () => {
  it('Novas vendas em caso de sucesso', async () => {
    const res = {};
    const req = { body: salesSucess.itemsSold }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'insert')
      .resolves({ type: null, message: salesSucess });
    
    await salesController.newSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(salesSucess);
  });

  it('Novas vendas em caso erro', async () => {
    const res = {};
    const req = { body: salesSucess.itemsSold }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'insert')
      .resolves(salesError);
    
    await salesController.newSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: salesError.message });
  });

  it('Buscando todas as vendas', async () => {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'findAll')
      .resolves({ type: null, message: findAllMock });
    
    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(findAllMock);
  });

  it('Buscando vendas pelo id "caso de sucesso"', async () => {
    const res = {};
    const req = { params: { id: 1 }};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'findById')
      .resolves({ type: null, message: findByIdMock });
    
    await salesController.getByIdSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(findByIdMock);    
  });

  it('Buscando vendas pelo id invalido "caso de erro"', async () => {
        const res = {};
    const req = { params: { id: 999 }};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'findById')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })
    
    await salesController.getByIdSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });    
  });
  afterEach(sinon.restore);
});