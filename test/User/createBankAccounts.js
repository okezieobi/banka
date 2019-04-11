import {
  expect,
  chai,
  chaiHttp,
  app,
} from '../index';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/accounts" to create a bank account as a signed in User with POST', () => {
  it('Should create a bank account as a signed in User at "/api/v1/accounts" with POST if all request inputs are valid', async () => {
    const testData = {
      ownerId: '1010101010',
      bankAccountType: 'Savings',
    };
    const response = await chai.request(app).post('/api/v1/accounts').send(testData);
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

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if owner or user id is undefined', async () => {
    const testData = {
      ownerId: '1010101010',
      bankAccountType: 'Savings',
    };
    testData.ownerId = undefined;
    const response = await chai.request(app).post('/api/v1/accounts').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('User Id is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if user or owner id is an empty string', async () => {
    const testData = {
      ownerId: '1010101010',
      bankAccountType: 'Savings',
    };
    testData.ownerId = '';
    const response = await chai.request(app).post('/api/v1/accounts').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('User Id is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if user or owner id is null', async () => {
    const testData = {
      ownerId: '1010101010',
      bankAccountType: 'Savings',
    };
    testData.ownerId = null;
    const response = await chai.request(app).post('/api/v1/accounts').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('User Id is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if user or owner id does not exist', async () => {
    const testData = {
      ownerId: '1010101010',
      bankAccountType: 'Savings',
    };
    delete testData.ownerId;
    const response = await chai.request(app).post('/api/v1/accounts').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('User Id is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if user or owner id is not a number', async () => {
    const testData = {
      ownerId: '1010101010',
      bankAccountType: 'Savings',
    };
    testData.ownerId = 'udhdsu@dfg';
    const response = await chai.request(app).post('/api/v1/accounts').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('User id must be numbers');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type is undefined ', async () => {
    const testData = {
      ownerId: '1010101010',
      bankAccountType: 'Savings',
    };
    testData.bankAccountType = undefined;
    const response = await chai.request(app).post('/api/v1/accounts').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type is an empty string ', async () => {
    const testData = {
      ownerId: '1010101010',
      bankAccountType: 'Savings',
    };
    testData.bankAccountType = '';
    const response = await chai.request(app).post('/api/v1/accounts').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type is null', async () => {
    const testData = {
      ownerId: '1010101010',
      bankAccountType: 'Savings',
    };
    testData.bankAccountType = null;
    const response = await chai.request(app).post('/api/v1/accounts').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type does not exist', async () => {
    const testData = {
      ownerId: '1010101010',
      bankAccountType: 'Savings',
    };
    delete testData.bankAccountType;
    const response = await chai.request(app).post('/api/v1/accounts').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type are not letters', async () => {
    const testData = {
      ownerId: '1010101010',
      bankAccountType: 'Savings',
    };
    testData.bankAccountType = 'Savings123';
    const response = await chai.request(app).post('/api/v1/accounts').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type must be letters');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type does not equal "Savings" or "savings" or "Current" or "current" ', async () => {
    const testData = {
      ownerId: '1010101010',
      bankAccountType: 'Savings',
    };
    testData.bankAccountType = 'saving';
    const response = await chai.request(app).post('/api/v1/accounts').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type must be savings or current');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if user is not registered', async () => {
    const testData = {
      ownerId: '1010101010',
      bankAccountType: 'Savings',
    };
    testData.ownerId = '20303930930';
    const response = await chai.request(app).post('/api/v1/accounts').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Only registered users can create bank accounts, please sign up');
  });
});
