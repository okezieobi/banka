import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);
describe('Test endpoints at "/api/v1/acounts/:account_number/transactions to get all account history of a specific account as an authenicated Client using GET', () => {
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

  it('Should get all account history at "/api/v1/accounts/:account_number/transactions" as an auhthicated client with GET', async () => {
    const token = await Test.generateToken('1010101010101');
    const accountNumber = '12121212121';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`).set('client-token', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('array');
    const { data } = response.body;
    const resData = Math.floor(Math.random() * data.length);
    if (data.length > 0) {
      expect(response.body.data[resData]).to.have.property('transactionId').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('createdOn').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('accountNumber').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('amount').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('cashier').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('transactionType').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('oldBalance').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('newBalance').to.be.a('number');
    }
  });

  it('Should not get account history at "/api/v1/accounts/:account_number/transactions" if token is an empty string', async () => {
    const token = '';
    const accountNumber = '12121212121';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get account history at "/api/v1/accounts/:account_number/transactions" if token is not sent', async () => {
    const accountNumber = '12121212121';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get account history at "/api/v1/accounts/:account_number/transactions" if token does not match client', async () => {
    const token = await Test.generateToken('1012221010101');
    const accountNumber = '12121212121';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`).set('client-token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not get account history at "/api/v1/accounts/:account_number/transactions" if id from token is not a number', async () => {
    const token = await Test.generateToken('10ufhaeroADBE010101');
    const accountNumber = '12121212121';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });


  it('Should not get account history at "/api/v1/accounts/:account_number/transactions" if id from token is a floating point number', async () => {
    const token = await Test.generateToken('101010.1010101');
    const accountNumber = '12121212121';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get account history at "/api/v1/accounts/:account_number/transactions" if id from token is a negative integer', async () => {
    const token = await Test.generateToken('-1010101010101');
    const accountNumber = '12121212121';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get account history at "/api/v1/accounts/:account_number/transactions" if id from token is a negative floating point number', async () => {
    const token = await Test.generateToken('-101010.1010101');
    const accountNumber = '12121212121';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get account history at "/api/v1/accounts/:account_number/transactions" if id from token is undefined', async () => {
    const token = await Test.generateToken(undefined);
    const accountNumber = '12121212121';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get account history at "/api/v1/accounts/:account_number/transactions" if id from token is a null', async () => {
    const token = await Test.generateToken(null);
    const accountNumber = '12121212121';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get account history at "/api/v1/accounts/:account_number/transactions" if account number is a floating point number', async () => {
    const token = await Test.generateToken('1010101010101');
    const accountNumber = '12121.212121';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should not get account history at "/api/v1/accounts/:account_number/transactions" if account number not a number', async () => {
    const token = await Test.generateToken('1010101010101');
    const accountNumber = '12121urDTYHsy098';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should not get account history at "/api/v1/accounts/:account_number/transactions" if account number is negative integer', async () => {
    const token = await Test.generateToken('1010101010101');
    const accountNumber = '-12121212121';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should not get account history at "/api/v1/accounts/:account_number/transactions" if account number is a negative floating point number', async () => {
    const token = await Test.generateToken('1010101010101');
    const accountNumber = '-12121.212121';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`).set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should not get account history at "/api/v1/accounts/:account_number/transactions" if account number is not found', async () => {
    const token = await Test.generateToken('1010101010101');
    const accountNumber = '12144434212121';
    const response = await chai.request(app).get(`/api/v1/accounts/${accountNumber}/transactions`).set('client-token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bank account not found');
  });
});
