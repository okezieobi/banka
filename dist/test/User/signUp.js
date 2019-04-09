"use strict";

var _index = require("../index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_index.chai.use(_index.chaiHttp);

describe('Test endpoints at "/api/v1/auth/signup" to create a User with POST', function () {
  it('Should create a User at "/api/v1/auth/signup" with POST if all request inputs are valid',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            _context.next = 3;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 3:
            response = _context.sent;
            (0, _index.expect)(response).to.have.status(201);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(201);
            (0, _index.expect)(response.body).to.have.property('data');
            (0, _index.expect)(response.body.data).to.have.property('id');
            (0, _index.expect)(response.body.data).to.have.property('firstName').equal(testData.userFirstName);
            (0, _index.expect)(response.body.data).to.have.property('lastName').equal(testData.userLastName);
            (0, _index.expect)(response.body.data).to.have.property('email').equal(testData.userEmail);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user first name is undefined',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userFirstName = undefined;
            _context2.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context2.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('First name is required');

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user first name is an empty string',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userFirstName = '';
            _context3.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context3.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('First name is required');

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user first name is null',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userFirstName = null;
            _context4.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context4.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('First name is required');

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user first name does not exist',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            delete testData.userFirstName;
            _context5.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context5.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('First name is required');

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user first name are not letters',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userFirstName = '000@342';
            _context6.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context6.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('First name must be letters');

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user last name is undefined',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userLastName = undefined;
            _context7.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context7.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Last name is required');

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user last name is an empty string',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userLastName = '';
            _context8.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context8.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Last name is required');

          case 9:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user last name is null',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userLastName = null;
            _context9.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context9.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Last name is required');

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user last name does not exist',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            delete testData.userLastName;
            _context10.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context10.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Last name is required');

          case 9:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user last name are not letters',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userLastName = '9834#42*!';
            _context11.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context11.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Last name must be letters');

          case 9:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user email is undefined',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userEmail = undefined;
            _context12.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context12.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Email is required');

          case 9:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user email is an empty string',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userEmail = '';
            _context13.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context13.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Email is required');

          case 9:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user email is null',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userEmail = null;
            _context14.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context14.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Email is required');

          case 9:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user email does not exist',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            delete testData.userEmail;
            _context15.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context15.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Email is required');

          case 9:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user email format is wrong',
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
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userEmail = 'haha@com';
            _context16.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context16.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Email format is wrong');

          case 9:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user email is has already been registered',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee17() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            testData = {
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userEmail = 'foobar@mail.com';
            _context17.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context17.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('User exists, please sign in');

          case 9:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user password is undefined',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee18() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            testData = {
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userPassword = undefined;
            _context18.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context18.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password is required');

          case 9:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user password is an empty string',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee19() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            testData = {
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userPassword = '';
            _context19.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context19.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password is required');

          case 9:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user password is null',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee20() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            testData = {
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userPassword = null;
            _context20.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context20.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password is required');

          case 9:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not exist',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee21() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            testData = {
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            delete testData.userPassword;
            _context21.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context21.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password is required');

          case 9:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user password is not a minimum of 8 characters',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee22() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            testData = {
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userPassword = '1OdBcd!';
            _context22.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context22.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');

          case 9:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not have at least 1 upper case letter',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee23() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            testData = {
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userPassword = '1234aodbcd!';
            _context23.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context23.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');

          case 9:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not have at least 1 lower case letter',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee24() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            testData = {
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userPassword = '1234AODBCD!';
            _context24.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context24.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');

          case 9:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not have at least 1 number',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee25() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            testData = {
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userPassword = 'odedeAODBCD!';
            _context25.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context25.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');

          case 9:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25);
  })));
  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not have at least 1 special character',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee26() {
    var testData, response;
    return regeneratorRuntime.wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            testData = {
              userFirstName: 'Frank',
              userLastName: 'Okezie',
              userEmail: 'haha@mail.com',
              userPassword: '1234AOdBcd!'
            };
            testData.userPassword = 'odedeAODBCD123';
            _context26.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/auth/signup').send(testData);

          case 4:
            response = _context26.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');

          case 9:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26);
  })));
});
//# sourceMappingURL=signUp.js.map