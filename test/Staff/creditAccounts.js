import {
  expect,
  chai,
  chaiHttp,
  app,
} from '../index';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/transactions/:account_number/credit" to credit a bank account with an amount as a signed in Staff with POST', () => {
  it('Should credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" with POST if all request inputs, headers and params are valid', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const testHeader = '3030303030';
    const accountNumber = '1212121212';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('cashier-id', testHeader).send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(201);
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.have.property('accountNumber');
    expect(response.body.data).to.have.property('transactionId');
    expect(response.body.data).to.have.property('amount').equal(parseFloat(testData.transactionAmount));
    expect(response.body.data).to.have.property('cashier');
    expect(response.body.data).to.have.property('transactionType');
    expect(response.body.data).to.have.property('accountBalance');
  });


  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if transaction amount is undefined', async () => {
    const testData = {
      transactionAmount: undefined,
    };
    const testHeader = '3030303030';
    const accountNumber = '1212121212';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('cashier-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Transaction amount is required');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if transaction amount is an empty string', async () => {
    const testData = {
      transactionAmount: '',
    };
    const testHeader = '3030303030';
    const accountNumber = '1212121212';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('cashier-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Transaction amount is required');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if transaction amount is null', async () => {
    const testData = {
      transactionAmount: null,
    };
    const testHeader = '3030303030';
    const accountNumber = '1212121212';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('cashier-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Transaction amount is required');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if transaction amount does not exist', async () => {
    const testData = {};
    const testHeader = '3030303030';
    const accountNumber = '1212121212';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('cashier-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Transaction amount is required');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if transaction amount is not a number', async () => {
    const testData = {
      transactionAmount: 'haha@Iamlaffing123',
    };
    const testHeader = '3030303030';
    const accountNumber = '1212121212';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('cashier-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Transaction amount must be numbers');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if cashier id is an empty string', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const testHeader = '';
    const accountNumber = '1212121212';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('cashier-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Cashier id is required');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if cashier id is not a number', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const testHeader = 'hahah@again';
    const accountNumber = '1212121212';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('cashier-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Cashier id must be numbers');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if cashier id is null', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const testHeader = null;
    const accountNumber = '1212121212';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('cashier-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Cashier id must be numbers');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if cashier id is not registered', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const testHeader = '3030303030303030300';
    const accountNumber = '1212121212';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('cashier-id', testHeader).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(404);
    expect(response.body).to.have.property('error').equal('Staff not found, only registered staff can debit or credit a bank account');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if account number is not a number', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const testHeader = '3030303030';
    const accountNumber = 'hahah@llslsl';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('cashier-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Account number must be numbers');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if account number is not a number', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const testHeader = '3030303030';
    const accountNumber = '12121212128888';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('cashier-id', testHeader).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(404);
    expect(response.body).to.have.property('error').equal('Account number not found');
  });
});
