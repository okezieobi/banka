import {
  expect,
  chai,
  chaiHttp,
  app,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/accounts" to create a bank account as a signed in User with POST', () => {
  it('Should create a bank account as a signed in User at "/api/v1/accounts" with POST if all request inputs are valid', async () => {
    const testData = {
      bankAccountType: 'Savings',
    };

    const testHeader = '1010101010';
    const response = await chai.request(app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);
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

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if user or owner id is an empty string', async () => {
    const testData = {
      bankAccountType: 'Savings',
    };

    const testHeader = '';
    const response = await chai.request(app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('User Id is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if user or owner id is not a number', async () => {
    const testData = {
      bankAccountType: 'Savings',
    };

    const testHeader = 'hahahwhatajoke@me';
    const response = await chai.request(app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('User id must be numbers');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if user or owner id is null', async () => {
    const testData = {
      bankAccountType: 'Savings',
    };

    const testHeader = null;
    const response = await chai.request(app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('User id must be numbers');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type is undefined ', async () => {
    const testData = {
      bankAccountType: undefined,
    };

    const testHeader = '1010101010';
    const response = await chai.request(app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type is an empty string ', async () => {
    const testData = {
      bankAccountType: '',
    };

    const testHeader = '1010101010';
    const response = await chai.request(app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type is null', async () => {
    const testData = {
      bankAccountType: null,
    };

    const testHeader = '1010101010';
    const response = await chai.request(app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type does not exist', async () => {
    const testData = {};

    const testHeader = '1010101010';
    const response = await chai.request(app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type is required');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type are not letters', async () => {
    const testData = {
      bankAccountType: '1234@567',
    };

    const testHeader = '1010101010';
    const response = await chai.request(app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type must be letters');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type does not equal "Savings" or "savings" or "Current" or "current" ', async () => {
    const testData = {
      bankAccountType: 'SavingCurren',
    };

    const testHeader = '1010101010';
    const response = await chai.request(app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Bank account type must be savings or current');
  });

  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if user is not registered', async () => {
    const testData = {
      bankAccountType: 'Savings',
    };

    const testHeader = '101010101000';
    const response = await chai.request(app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Only registered users can create bank accounts, please sign up');
  });
});
