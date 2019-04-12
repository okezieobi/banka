import {
  expect,
  chai,
  chaiHttp,
  app,
} from '../index';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/accounts/:account_number" to delete a bank account and all associated transactions as a signed in Admin with DELETE', () => {
  it('Should delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if all request headers and params are valid', async () => {
    const testHeader = '5050505050';
    const accountNumber = '1212121212';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-id', testHeader);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(200);
    expect(response.body).to.have.property('message').equal('Account successfully deleted');
  });


  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if admin id is an empty string', async () => {
    const testHeader = '';
    const accountNumber = '1212121212';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-id', testHeader);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Admin id is required');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if admin id is not a number', async () => {
    const testHeader = 'hahahahahah';
    const accountNumber = '1212121212';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-id', testHeader);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Admin id must be numbers');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if admin id is null', async () => {
    const testHeader = null;
    const accountNumber = '1212121212';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-id', testHeader);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Admin id must be numbers');
  });

  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if admin id is not found', async () => {
    const testHeader = '84933948939398';
    const accountNumber = '1212121212';
    const response = await chai.request(app).delete(`/api/v1/accounts/${accountNumber}`).set('admin-id', testHeader);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(404);
    expect(response.body).to.have.property('error').equal('Admin not found, only registered admins can delete a bank account');
  });
});
