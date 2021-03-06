import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/account/account_number" to toggle the status of a bank account as a signed in Admin with PATCH', () => {
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

  it('Should patch the status of a bank account as a signed in Admin at "/api/v1/account/account_number" with POST if all request inputs, headers and params are valid', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '14141414141';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('accountNumber').to.be.a('number');
    expect(response.body.data).to.have.property('status').to.be.a('string').to.equal(testData.accountStatus);
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account status equals status in request', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal(`Account status is already ${testData.accountStatus}`);
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account status is undefined', async () => {
    const testData = {
      accountStatus: undefined,
    };
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account status is required');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account status is an empty string', async () => {
    const testData = {
      accountStatus: '',
    };
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account status is required');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account status is null', async () => {
    const testData = {
      accountStatus: null,
    };
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account status is required');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account status does not exist', async () => {
    const testData = {};
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account status is required');
  });


  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account status are not letters', async () => {
    const testData = {
      accountStatus: '12345@45',
    };
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account status must be letters');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account status does not equal active or dormant', async () => {
    const testData = {
      accountStatus: 'activ',
    };
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account status must equal active or dormant');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if admin token is an empty string', async () => {
    const token = '';
    const testData = {
      accountStatus: 'active',
    };
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if admin token is not sent', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });


  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if admin token is not a match', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const token = await Test.generateToken('5050505');
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any admin');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if id from admin token is a negative integer', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const token = await Test.generateToken('-5050505050505');
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if id from admin token is a floating point number', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const token = await Test.generateToken('505050.5050505');
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if id from admin token is a negative floating point number', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const token = await Test.generateToken('-505050.5050505');
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if id from admin token is undefined', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const token = await Test.generateToken(undefined);
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if id from admin token is null', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const token = await Test.generateToken(null);
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if id from admin token is not a number', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const token = await Test.generateToken('50505PDFldse');
    const accountNumber = '13131313131';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account number is not number', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const token = await Test.generateToken('5050505050505');
    const accountNumber = 'lmaooooooooooo';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account number a negative integer', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '-14141414141';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account number a floating point number', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '141414.14141';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account number a negative floating point number', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '-141414.14141';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account number is not found', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '338383838383';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bank account not found');
  });
});
