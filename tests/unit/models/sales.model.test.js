const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const connection = require('../../../src/models/connection');

const { salesMock, insertMock, findAllMock, findByIdMock } = require("./mocks/sales.model.mock");

describe('Teste de unidade de Sales', () => {
  it('Iserir novas sales', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    
    const result = await salesModel.insert(insertMock);

    expect(result).to.be.deep.equal(salesMock);
  });

  it('Buscando todas as sales', async () => {
    sinon.stub(connection, 'execute').resolves([findAllMock]);

    const result = await salesModel.findAll();

    expect(result).to.be.deep.equal(findAllMock);
  });

  it('Buscando sales pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([findByIdMock]);

    const result = await salesModel.findById(2);

    expect(result).to.be.deep.equal(findByIdMock);
  })

  it('Deletando pelo id', async () => {
    sinon.stub(connection, 'execute').resolves({});

    await salesModel.deleteById(2);
  })

  afterEach(sinon.restore);
});
