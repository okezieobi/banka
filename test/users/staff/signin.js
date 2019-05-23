import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../../test';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/auth/signin/staff" to sign in a Staff with POST', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should sign in a Staff at "/api/v1/auth/signin/staff" with POST if all request inputs are valid', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('username').to.be.a('string').to.equal(testData.userName);
    expect(response.body.data).to.have.property('type').to.be.a('string').to.equal('Staff');
    expect(response.body).to.have.property('headers').to.be.an('object');
    expect(response.body.headers).to.have.property('access-token').to.be.a('string');
    expect(response.header).to.have.property('access-token').to.be.a('string');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if user name is an empty string', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    testData.userName = '';
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if user name is not sent', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    delete testData.userName;
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if user name is undefined', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    testData.userName = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if user name is null', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    testData.userName = null;
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if user name is not a staff', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    testData.userName = 'okbobo';
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Staff does not exist, please sign up');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if password is an empty string', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    testData.adminStaffPassword = '';
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if password is not sent', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    delete testData.adminStaffPassword;
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if password is undefined', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    testData.adminStaffPassword = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if password is null', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    testData.adminStaffPassword = null;
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if password does not match staff', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    testData.adminStaffPassword = 'AbcDFer123*@is!98f';
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password does not match user');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if password is not a minimum of 8 characters', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    testData.adminStaffPassword = 'dBcd!';
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if password does not have at least 1 upper case letter', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    testData.adminStaffPassword = '1234aodbcd!';
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if password does not have at least 1 lower case letter', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    testData.adminStaffPassword = '1234AODBCD!';
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if password does not have at least 1 number', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    testData.adminStaffPassword = 'odedeAODBCD!@';
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should not sign in a Staff at "/api/v1/auth/signin/staff" with Post if password does not have at least 1 special character', async () => {
    const testData = {
      userName: 'okezie',
      adminStaffPassword: 'AbcDFer123*@is!',
    };
    testData.adminStaffPassword = 'odedeAODBCD123';
    const response = await chai.request(app).post('/api/v1/auth/signin/staff').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });
});
