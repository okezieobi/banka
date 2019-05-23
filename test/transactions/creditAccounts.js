import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/transactions/:account_number/credit" to credit a bank account with an amount as a signed in Staff with POST', () => {
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

  it('Should credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" with POST if all request inputs, headers and params are valid (transaction amount is an integer)', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('accountNumber').to.be.a('number');
    expect(response.body.data).to.have.property('transactionId').to.be.a('number');
    expect(response.body.data).to.have.property('amount').to.be.a('number').to.equal(parseFloat(testData.transactionAmount));
    expect(response.body.data).to.have.property('cashier').to.be.a('number');
    expect(response.body.data).to.have.property('transactionType').to.be.a('string').to.equal('Credit');
    expect(response.body.data).to.have.property('accountBalance').to.be.a('number');
  });

  it('Should credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" with POST if all request inputs, headers and params are valid (transaction amount is a decimal number)', async () => {
    const testData = {
      transactionAmount: '1000.504',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('accountNumber').to.be.a('number');
    expect(response.body.data).to.have.property('transactionId').to.be.a('number');
    expect(response.body.data).to.have.property('amount').to.be.a('number').to.equal(parseFloat(testData.transactionAmount));
    expect(response.body.data).to.have.property('cashier').to.be.a('number');
    expect(response.body.data).to.have.property('transactionType').to.be.a('string').to.equal('Credit');
    expect(response.body.data).to.have.property('accountBalance').to.be.a('number');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if transaction amount is undefined', async () => {
    const testData = {
      transactionAmount: undefined,
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Transaction amount is required');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if transaction amount is an empty string', async () => {
    const testData = {
      transactionAmount: '',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Transaction amount is required');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if transaction amount is null', async () => {
    const testData = {
      transactionAmount: null,
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Transaction amount is required');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if transaction amount does not exist', async () => {
    const testData = {};
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Transaction amount is required');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if transaction amount is not a number', async () => {
    const testData = {
      transactionAmount: 'haha@Iamlaffing123',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Transaction amount must be a positive number');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if transaction amount is a negative integer', async () => {
    const testData = {
      transactionAmount: '-1000',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Transaction amount must be a positive number');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if transaction amount is a negative decimal number', async () => {
    const testData = {
      transactionAmount: '-1000.50',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Transaction amount must be a positive number');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if staff token is an empty string', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = '';
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if staff token is not sent', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if id from staff token is not a number', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('303030ADLEosryfu');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if id from staff token is null', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken(null);
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if id from staff token is undefined', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken(undefined);
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if id from staff token is a negative integer', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('-3030303030303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if id from staff token is a decimal number', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('30303030303.0303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if id from staff token is a negative decimal number', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('-30303030303.0303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if staff token does not match any staff', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('3030345450303');
    const accountNumber = '12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any staff');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if account number is not an integer', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '121212sioeDlsQS';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });


  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if account number is a negative integer', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '-12121212121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if account number is a decimal number', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '121212121.121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if account number is a negative decimal number', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '-121212121.121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/transactions/:account_number/credit" if account number is not found', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '121213232121';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bank account not found');
  });

  it('Should NOT credit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if account is not active', async () => {
    const testData = {
      transactionAmount: '1000',
    };
    const token = await Test.generateToken('3030303030303');
    const accountNumber = '14141414141';
    const response = await chai.request(app).post(`/api/v1/transactions/${accountNumber}/credit`).set('staff-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Only active accounts can be credited');
  });
});
