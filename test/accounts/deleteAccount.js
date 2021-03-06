import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/accounts/:account_number" to delete a bank account and all associated transactions as a signed in Admin with DELETE', () => {
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

  it('Should delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if all request headers and params are valid', async () => {
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '14141414141';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('message').to.be.a('string').to.equal('Account successfully deleted');
  });


  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if admin token is an empty string', async () => {
    const token = '';
    const accountNumber = '14141414141';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if admin token is not sent', async () => {
    const accountNumber = '14141414141';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if id from admin token is not a number', async () => {
    const token = await Test.generateToken('50505PDFldse');
    const accountNumber = '14141414141';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });


  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if id from admin token is a negative integer', async () => {
    const token = await Test.generateToken('-5050505050505');
    const accountNumber = '14141414141';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if id from admin token is a floating point number', async () => {
    const token = await Test.generateToken('505050.5050505');
    const accountNumber = '14141414141';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if id from admin token is a negative floating point number', async () => {
    const token = await Test.generateToken('-505050.5050505');
    const accountNumber = '14141414141';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if id from admin token is undefined', async () => {
    const token = await Test.generateToken(undefined);
    const accountNumber = '14141414141';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if id from admin token is null', async () => {
    const token = await Test.generateToken(null);
    const accountNumber = '14141414141';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if token does not match master admin', async () => {
    const token = await Test.generateToken('5050504054045');
    const accountNumber = '14141414141';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any admin');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if account number is not a number', async () => {
    const token = await Test.generateToken('5050505050505');
    const accountNumber = 'hahahahah';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if account number is a negative integer', async () => {
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '-14141414141';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if account number is floating point number', async () => {
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '141414.14141';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if account number is a negative floating point number', async () => {
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '-14141.414141';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Account number must be a positive integer');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if account number is not found', async () => {
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '112323222223';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bank account not found');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if account number has already been deleted', async () => {
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '14141414141';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bank account not found');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if account status is not dormant', async () => {
    const token = await Test.generateToken('5050505050505');
    const accountNumber = '12121212121';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Only dormant accounts can be deleted, please update account status');
  });
});
