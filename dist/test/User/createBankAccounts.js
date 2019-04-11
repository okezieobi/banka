"use strict";

var _index = require("../index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_index.chai.use(_index.chaiHttp);

describe('Test endpoints at "/api/v1/accounts" to create a bank account as a signed in User with POST', function () {
  it('Should create a bank account as a signed in User at "/api/v1/accounts" with POST if all request inputs are valid',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var testData, testHeader, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            testData = {
              bankAccountType: 'Savings'
            };
            testHeader = '1010101010';
            _context.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);

          case 4:
            response = _context.sent;
            (0, _index.expect)(response).to.have.status(201);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(201);
            (0, _index.expect)(response.body).to.have.property('data');
            (0, _index.expect)(response.body.data).to.have.property('accountNumber');
            (0, _index.expect)(response.body.data).to.have.property('firstName');
            (0, _index.expect)(response.body.data).to.have.property('lastName');
            (0, _index.expect)(response.body.data).to.have.property('email');
            (0, _index.expect)(response.body.data).to.have.property('openingBalance');
            (0, _index.expect)(response.body.data).to.have.property('type').equal(testData.bankAccountType);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if user or owner id is an empty string',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var testData, testHeader, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            testData = {
              bankAccountType: 'Savings'
            };
            testHeader = '';
            _context2.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);

          case 4:
            response = _context2.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('User Id is required');

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if user or owner id is not a number',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var testData, testHeader, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            testData = {
              bankAccountType: 'Savings'
            };
            testHeader = 'hahahwhatajoke@me';
            _context3.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);

          case 4:
            response = _context3.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('User id must be numbers');

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type is undefined ',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var testData, testHeader, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            testData = {
              bankAccountType: undefined
            };
            testHeader = '1010101010';
            _context4.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);

          case 4:
            response = _context4.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Bank account type is required');

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type is an empty string ',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var testData, testHeader, response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            testData = {
              bankAccountType: ''
            };
            testHeader = '1010101010';
            _context5.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);

          case 4:
            response = _context5.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Bank account type is required');

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type is null',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var testData, testHeader, response;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            testData = {
              bankAccountType: null
            };
            testHeader = '1010101010';
            _context6.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);

          case 4:
            response = _context6.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Bank account type is required');

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type does not exist',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var testData, testHeader, response;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            testData = {};
            testHeader = '1010101010';
            _context7.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);

          case 4:
            response = _context7.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Bank account type is required');

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type are not letters',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var testData, testHeader, response;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            testData = {
              bankAccountType: '1234@567'
            };
            testHeader = '1010101010';
            _context8.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);

          case 4:
            response = _context8.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Bank account type must be letters');

          case 9:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if bank account type does not equal "Savings" or "savings" or "Current" or "current" ',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9() {
    var testData, testHeader, response;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            testData = {
              bankAccountType: 'SavingCurren'
            };
            testHeader = '1010101010';
            _context9.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);

          case 4:
            response = _context9.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Bank account type must be savings or current');

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it('Should NOT create a bank account as a signed in User at "/api/v1/accounts" if user is not registered',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10() {
    var testData, testHeader, response;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            testData = {
              bankAccountType: 'Savings'
            };
            testHeader = '101010101000';
            _context10.next = 4;
            return _index.chai.request(_index.app).post('/api/v1/accounts').set('owner-id', testHeader).send(testData);

          case 4:
            response = _context10.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Only registered users can create bank accounts, please sign up');

          case 9:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
});
//# sourceMappingURL=createBankAccounts.js.map