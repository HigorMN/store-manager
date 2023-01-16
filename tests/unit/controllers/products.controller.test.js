const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productMock, updateByIdMock } = require('./mocks/products.controller.mock');

describe('Testes de unidade do controller de produtos', () => {
  it('Listando os produtos', async () => {
    const res = {};
    const req = {};
    const productsList = [productMock];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'findAll')
      .resolves({ type: null, message: productsList })
    
    await productsController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsList);
  });

  it('buscando 1 produto', async () => {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'findById')
      .resolves({ type: null, message: productMock });
    
    await productsController.getProfuct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productMock);
  });

  it('retorna um erro caso o produto não existe', async () => {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'findById')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    
    await productsController.getProfuct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('adicionando novo produto', async () => {
    const res = {};
    const req = {
      body: { name: 'ProdutoX' },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'insert')
      .resolves({ type: null, message: productMock });
    
    await productsController.newProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productMock);
  });

  it('Atulizar produto pelo id', async () => {
    const res = {};
    const req = {
      body: { name: updateByIdMock.name },
      params: { id: updateByIdMock.id },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'updateById')
      .resolves({ type: null, message: updateByIdMock });
    
    await productsController.updateProductById(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updateByIdMock);
  })

    it('Atulizar produto pelo id inexistete', async () => {
    const res = {};
    const req = {
      body: { name: updateByIdMock.name },
      params: { id: updateByIdMock.id },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'updateById')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    
    await productsController.updateProductById(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  })

  afterEach(sinon.restore);
});