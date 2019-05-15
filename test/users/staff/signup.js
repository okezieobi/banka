import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../../test';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/auth/signup/staff" to sign up a Staff as an authenicated master Admin with POST', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should sign up a Staff at "/api/v1/auth/signup/staff" with POST as an authenticated master admin if all request inputs are valid', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(201);
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.have.property('id');
    expect(response.body.data).to.have.property('username').equal(testData.userName);
    expect(response.body.data).to.have.property('type').equal('Staff');
    expect(response.body).to.have.property('headers');
    expect(response.body.headers).to.have.property('access-token');
    expect(response.header).to.have.property('access-token');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if username is an empty string', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    testData.userName = '';
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Username is required');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if username is not sent', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    delete testData.userName;
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Username is required');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if username is undefined', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    testData.userName = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Username is required');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if username is null', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    testData.userName = null;
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Username is required');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if username is already registered', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    testData.userName = 'okezie';
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(404);
    expect(response.body).to.have.property('error').equal('Staff exists, please sign in');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if password is an empty string', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    testData.adminStaffPassword = '';
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Password is required');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if password is not sent', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    delete testData.adminStaffPassword;
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Password is required');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if password is undefined', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    testData.adminStaffPassword = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Password is required');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if password is null', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    testData.adminStaffPassword = null;
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Password is required');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if password is not a minimum of 8 characters', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    testData.adminStaffPassword = 'dBcd!';
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if password has at least one uppercase letter', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    testData.adminStaffPassword = '1234aodbcd!';
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if password has at least one lowercase letter', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    testData.adminStaffPassword = '1234AODBCD!';
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if password has at least one number', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    testData.adminStaffPassword = 'odedeAODBCD!@';
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if password has at least one special character', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('5050505050505');
    testData.adminStaffPassword = 'odedeAODBCD123';
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if token is an empty string', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = '';
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Token is required, please sign in or sign up');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if token is not sent', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Token is required, please sign in or sign up');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if token does not match admin', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('505050505050512');
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(404);
    expect(response.body).to.have.property('error').equal('Token does not match master admin');
  });

  it('Should sign up a Staff at"/api/v1/auth/signup/staff" with POST if id from token is not a number', async () => {
    const testData = {
      userName: 'Frank',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const token = await Test.generateToken('505050EeldldDS');
    const response = await chai.request(app).post('/api/v1/auth/signup/staff').set('admin-token', token).send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').equal(400);
    expect(response.body).to.have.property('error').equal('Id from token is not an integer');
  });
});
