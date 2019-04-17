import {
  expect,
  chai,
  chaiHttp,
  app,
} from '../index';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/account/account_number" to toggle the status of a bank account as a signed in Admin with PATCH', () => {
  it('Should patch the status of a bank account as a signed in Admin at "/api/v1/account/account_number" with POST if all request inputs, headers and params are valid', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const testHeader = '5050505050';
    const accountNumber = '1414141414';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-id', testHeader).send(testData);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(200);
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.have.property('accountNumber');
    expect(response.body.data).to.have.property('status').equal(testData.accountStatus);
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account status equals status in request', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const testHeader = '5050505050';
    const accountNumber = '1313131313';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal(`Account status is already ${testData.accountStatus}`);
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account status is undefined', async () => {
    const testData = {
      accountStatus: undefined,
    };
    const testHeader = '5050505050';
    const accountNumber = '1313131313';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Account status is required');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account status is an empty string', async () => {
    const testData = {
      accountStatus: '',
    };
    const testHeader = '5050505050';
    const accountNumber = '1313131313';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Account status is required');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account status is null', async () => {
    const testData = {
      accountStatus: null,
    };
    const testHeader = '5050505050';
    const accountNumber = '1313131313';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Account status is required');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account status does not exist', async () => {
    const testData = {};
    const testHeader = '5050505050';
    const accountNumber = '1313131313';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Account status is required');
  });


  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account status are not letters', async () => {
    const testData = {
      accountStatus: '12345@45',
    };
    const testHeader = '5050505050';
    const accountNumber = '1313131313';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Account status must be letters');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account status does not equal active or dormant', async () => {
    const testData = {
      accountStatus: 'activ',
    };
    const testHeader = '5050505050';
    const accountNumber = '1313131313';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Account status must equal active or dormant');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if admin id is an empty string', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const testHeader = '';
    const accountNumber = '1313131313';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Admin id is required');
  });


  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number/credit" if admin id is not a number', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const testHeader = 'lmaooooooooooo';
    const accountNumber = '1313131313';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Admin id must be numbers');
  });


  it('Should NOT patch the status of a bank account as a signed in Staff at "/api/v1/account/:account_number" if admin id is not a number', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const testHeader = null;
    const accountNumber = '1313131313';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Admin id must be numbers');
  });


  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if admin id is not found', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const testHeader = '505050505000000';
    const accountNumber = '1313131313';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-id', testHeader).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(404);
    expect(response.body).to.have.property('error').equal('Admin id not found, only registered admins can update an account detail');
  });

  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account number is not number', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const testHeader = '5050505050';
    const accountNumber = 'lmaooooooooooo';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-id', testHeader).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Account number must be a number');
  });


  it('Should NOT patch the status of a bank account as a signed in Admin at "/api/v1/account/:account_number" if account number is not found', async () => {
    const testData = {
      accountStatus: 'active',
    };
    const testHeader = '5050505050';
    const accountNumber = '338383838383';
    const response = await chai.request(app).patch(`/api/v1/account/${accountNumber}`).set('admin-id', testHeader).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(404);
    expect(response.body).to.have.property('error').equal('Account number not found');
  });
});
