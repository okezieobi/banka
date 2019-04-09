"use strict";

var _index = require("../index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_index.chai.use(_index.chaiHttp);

describe('Test endpoints at "/api/v1/auth/signin" to sign in a User with POST', function () {
  it('Should create a User at "/api/v1/auth/signin" with POST if all request inputs are valid',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            _context.next = 3;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 3:
            response = _context.sent;
            (0, _index.expect)(response).to.have.status(200);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(200);
            (0, _index.expect)(response.body).to.have.property('data');
            (0, _index.expect)(response.body.data).to.have.property('id');
            (0, _index.expect)(response.body.data).to.have.property('firstName');
            (0, _index.expect)(response.body.data).to.have.property('lastName');
            (0, _index.expect)(response.body.data).to.have.property('email').equal(testData.userEmail);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email is undefined',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            testData.userEmail = undefined;
            _context2.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context2.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Email is required');

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email is an empty string',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            testData.userEmail = '';
            _context3.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context3.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Email is required');

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email is null',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            testData.userEmail = null;
            _context4.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context4.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Email is required');

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email does not exist',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            delete testData.userEmail;
            _context5.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context5.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Email is required');

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email has not been registered',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            testData.userEmail = 'haha@mail.com';
            _context6.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context6.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('User does not exist, please sign up');

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is undefined',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            testData.userPassword = undefined;
            _context7.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context7.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password is required');

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('Should NOT sign in  a User at "/api/v1/auth/signin" if user password is an empty string',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            testData.userPassword = '';
            _context8.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context8.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password is required');

          case 9:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is null',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            testData.userPassword = null;
            _context9.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context9.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password is required');

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not exist',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            delete testData.userPassword;
            _context10.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context10.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password is required');

          case 9:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is not a minimum of 8 characters',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            testData.userPassword = 'dBcd!';
            _context11.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context11.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');

          case 9:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not have at least 1 upper case letter',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            testData.userPassword = '1234aodbcd!';
            _context12.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context12.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');

          case 9:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not have at least 1 lower case letter',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            testData.userPassword = '1234AODBCD!';
            _context13.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context13.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');

          case 9:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  })));
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not have at least 1 number',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            testData.userPassword = 'odedeAODBCD!@';
            _context14.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context14.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');

          case 9:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  })));
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not have at least 1 special character',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee15() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            testData.userPassword = 'odedeAODBCD123';
            _context15.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context15.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');

          case 9:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  })));
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not not match with input password',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee16() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            testData = {
              userEmail: 'foobar@mail.com',
              userPassword: 'AbcDFer123*@is!'
            };
            testData.userPassword = 'AbcDFer123*@is!90';
            _context16.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signin').send(testData);

          case 4:
            response = _context16.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password does not match user');

          case 9:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  })));
});
//# sourceMappingURL=signIn.js.map