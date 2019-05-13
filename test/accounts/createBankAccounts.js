import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/accounts" to create a bank account as a signed in User with POST', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should create a bank account as a signed in User at "/api/v1/accounts" with POST if all request inputs are valid', async () => {
    const testData = {
      bankAccountType: 'Savings',
    };

    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/accounts').set('client-token', token).send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(201);
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.have.property('accountNumber');
    expect(response.body.data).to.have.property('firstName');
    expect(response.body.data).to.have.property('lastName');
    expect(response.body.data).to.have.property('email');
    expect(response.body.data).to.have.property('openingBalance');
    expect(response.body.data).to.have.property('type').equal(testData.bankAccountType);
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if client token is an empty string', async () => {
    const token = '';
    const testData = {
      bankAccountType: 'Savings',
    };

    const response = await chai.request(app).post('/api/v1/accounts').set('client-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Token is required, please sign in or sign up');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if client token is not sent', async () => {
    const testData = {
      bankAccountType: 'Savings',
    };

    const response = await chai.request(app).post('/api/v1/accounts').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Token is required, please sign in or sign up');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if client token does not match with any client', async () => {
    const token = await Test.generateToken('1010101010101222222');
    const testData = {
      bankAccountType: 'Savings',
    };

    const response = await chai.request(app).post('/api/v1/accounts').set('client-token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(404);
    expect(response.body).to.have.property('error').equal('Token provided does not match any user');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if id from client token is not a number', async () => {
    const token = await Test.generateToken('101010101lJDFkdw');
    const testData = {
      bankAccountType: 'Savings',
    };

    const response = await chai.request(app).post('/api/v1/accounts').set('client-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Id from token is not an integer');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type is undefined ', async () => {
    const token = await Test.generateToken('1010101010101');
    const testData = {
      bankAccountType: undefined,
    };

    const response = await chai.request(app).post('/api/v1/accounts').set('client-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type is an empty string ', async () => {
    const testData = {
      bankAccountType: '',
    };

    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/accounts').set('client-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type is null', async () => {
    const testData = {
      bankAccountType: null,
    };

    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/accounts').set('client-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type does not exist', async () => {
    const testData = {};

    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/accounts').set('client_token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type are not letters', async () => {
    const testData = {
      bankAccountType: '1234@567',
    };

    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/accounts').set('client-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type must be letters');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type does not equal "Savings" or "savings" or "Current" or "current" ', async () => {
    const testData = {
      bankAccountType: 'SavingCurren',
    };

    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/accounts').set('client-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type must be savings or current');
  });
});
