import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/transactions/:account_number/debit" to debit a bank account with an amount as a signed in Staff with POST', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  before(async () => {
    await pool.queryAny(Test.accounts());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" with POST if all request inputs, headers and params are valid', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/debit`).set('staff-token', token).send(testData);
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

  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if transaction amount is undefined', async () => {
    const testData = {
      transactionAmount: undefined,
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/debit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Transaction amount is required');
  });

  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if transaction amount is an empty string', async () => {
    const testData = {
      transactionAmount: '',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/debit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Transaction amount is required');
  });

  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if transaction amount is null', async () => {
    const testData = {
      transactionAmount: null,
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/debit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Transaction amount is required');
  });

  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if transaction amount does not exist', async () => {
    const testData = {};
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/debit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Transaction amount is required');
  });

  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if transaction amount is not a number', async () => {
    const testData = {
      transactionAmount: 'haha@Iamlaffing123',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/debit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Transaction amount must be numbers');
  });

  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if staff token is an empty string', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = '';
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/debit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Token is required, please sign in or sign up');
  });

  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if cashier token is not sent', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/debit`).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Token is required, please sign in or sign up');
  });

  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if staff token is not number', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('3030303DEsdfpt3fSQ3');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/debit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Id from token is not an integer');
  });

  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if staff id does not match', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('303030300040404');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/debit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(404);
    expect(response.body).to.have.property('error').equal('Token does not match any admin');
  });


  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if account number is not a number', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = 'hahah@llslsl';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/debit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Account number must be numbers');
  });

  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if account number is not found', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12212128888';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/debit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(404);
    expect(response.body).to.have.property('error').equal('Bank account not found');
  });

  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if account is not active', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '14141414141';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/debit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Only active accounts can be debited');
  });

  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if account balance is insufficient', async () => {
    const testData = {
      transactionAmount: '99000',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/debit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Insufficient balance');
  });
});
