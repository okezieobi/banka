import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoint at "/api/v1/transactions/:transaction_id" to get a specific transaction as an authenticated Client with GET', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  before(async () => {
    await pool.queryAny(Test.accounts());
  });

  before(async () => {
    await pool.queryAny(Test.transactions());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });
  it('Should get a specific transaction at "api/v1/transactions/:transaction_id" with GET if all input data are correct', async () => {
    const token = await Test.generateToken('1010101010101');
    const transactId = '6666666666666';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`).set('client-token', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('transactionId').to.be.a('number');
    expect(response.body.data).to.have.property('createdOn').to.be.a('string');
    expect(response.body.data).to.have.property('accountNumber').to.be.a('number');
    expect(response.body.data).to.have.property('amount').to.be.a('number');
    expect(response.body.data).to.have.property('cashier').to.be.a('number');
    expect(response.body.data).to.have.property('transactionType').to.be.a('string');
    expect(response.body.data).to.have.property('oldBalance').to.be.a('number');
    expect(response.body.data).to.have.property('newBalance').to.be.a('number');
  });

  it('Should NOT get a specific transaction as an authenticated client at "/api/v1/transactions/transaction_id" if client token is an empty string', async () => {
    const token = '';
    const transactId = '6666666666666';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should NOT get a specific transaction as an authenticated client at "/api/v1/transactions/transaction_id" if client token not sent', async () => {
    const transactId = '6666666666666';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should NOT get a specific transaction as an authenticated client at "/api/v1/transactions/transaction_id" if client token does not match any client', async () => {
    const token = await Test.generateToken('1010101010333');
    const transactId = '6666666666666';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`).set('client-token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should NOT get a specific transaction as an authenticated client at "/api/v1/transactions/transaction_id" if id from client token is not a number', async () => {
    const token = await Test.generateToken('101010RETdhfeW');
    const transactId = '6666666666666';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });


  it('Should NOT get a specific transaction as an authenticated client at "/api/v1/transactions/transaction_id" if id from client token is a negative integer', async () => {
    const token = await Test.generateToken('-1010101010101');
    const transactId = '6666666666666';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT get a specific transaction as an authenticated client at "/api/v1/transactions/transaction_id" if id from client token is a floating point number', async () => {
    const token = await Test.generateToken('101010.1010101');
    const transactId = '6666666666666';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT get a specific transaction as an authenticated client at "/api/v1/transactions/transaction_id" if id from client token is a negative floating point number', async () => {
    const token = await Test.generateToken('-101010.1010101');
    const transactId = '6666666666666';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT get a specific transaction as an authenticated client at "/api/v1/transactions/transaction_id" if id from client token is undefined', async () => {
    const token = await Test.generateToken(undefined);
    const transactId = '6666666666666';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT get a specific transaction as an authenticated client at "/api/v1/transactions/transaction_id" if id from client token is null', async () => {
    const token = await Test.generateToken(null);
    const transactId = '6666666666666';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT get a specific transaction as an authenticated client at "/api/v1/transactions/transaction_id" if transactionId is not a number', async () => {
    const token = await Test.generateToken('1010101010101');
    const transactId = '66666666yryDHFsk';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Transaction id must be a positive integer');
  });

  it('Should NOT get a specific transaction as an authenticated client at "/api/v1/transactions/transaction_id" if transactionId is a negative integer', async () => {
    const token = await Test.generateToken('1010101010101');
    const transactId = '-6666666666666';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Transaction id must be a positive integer');
  });

  it('Should NOT get a specific transaction as an authenticated client at "/api/v1/transactions/transaction_id" if transactionId is a floating point number', async () => {
    const token = await Test.generateToken('1010101010101');
    const transactId = '6666666.666666';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Transaction id must be a positive integer');
  });

  it('Should NOT get a specific transaction as an authenticated client at "/api/v1/transactions/transaction_id" if transactionId is a negative floating point number', async () => {
    const token = await Test.generateToken('1010101010101');
    const transactId = '-6666666.666666';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Transaction id must be a positive integer');
  });

  it('Should NOT get a specific transaction as an authenticated client at "/api/v1/transactions/transaction_id" if transactionId is not a found', async () => {
    const token = await Test.generateToken('1010101010101');
    const transactId = '9465866666666';
    const response = await chai.request(app).get(`/api/v1/transactions/${transactId}`).set('client-token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Transaction not found');
  });
});
