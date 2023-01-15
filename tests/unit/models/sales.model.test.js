const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const connection = require('../../../src/models/connection');

const { salesMock, insertMock } = require("./mocks/sales.model.mock");

describe('Teste de unidade de Sales', () => {
  it('Iserir novas sales', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    
    const result = await salesModel.insert(insertMock);

    expect(result).to.be.deep.equal(salesMock);
  });
  afterEach(sinon.restore);
});
