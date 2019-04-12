"use strict";

var _index = require("../index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_index.chai.use(_index.chaiHttp);

describe('Test endpoints at "/api/v1/transactions/:account_number/debit" to debit a bank account with an amount as a signed in Staff with POST', function () {
  it('Should debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" with POST if all request inputs, headers and params are valid',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var testData, testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            testData = {
              transactionAmount: '1000'
            };
            testHeader = '3030303030';
            accountNumber = '1212121212';
            _context.next = 5;
            return _index.chai.request(_index.app).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('cashier-id', testHeader).send(testData);

          case 5:
            response = _context.sent;
            (0, _index.expect)(response).to.have.status(201);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(201);
            (0, _index.expect)(response.body).to.have.property('data');
            (0, _index.expect)(response.body.data).to.have.property('accountNumber');
            (0, _index.expect)(response.body.data).to.have.property('transactionId');
            (0, _index.expect)(response.body.data).to.have.property('amount').equal(parseFloat(testData.transactionAmount));
            (0, _index.expect)(response.body.data).to.have.property('cashier');
            (0, _index.expect)(response.body.data).to.have.property('transactionType');
            (0, _index.expect)(response.body.data).to.have.property('accountBalance');

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if transaction amount is undefined',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var testData, testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            testData = {
              transactionAmount: undefined
            };
            testHeader = '3030303030';
            accountNumber = '1212121212';
            _context2.next = 5;
            return _index.chai.request(_index.app).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('cashier-id', testHeader).send(testData);

          case 5:
            response = _context2.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Transaction amount is required');

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if transaction amount is an empty string',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var testData, testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            testData = {
              transactionAmount: ''
            };
            testHeader = '3030303030';
            accountNumber = '1212121212';
            _context3.next = 5;
            return _index.chai.request(_index.app).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('cashier-id', testHeader).send(testData);

          case 5:
            response = _context3.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Transaction amount is required');

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if transaction amount is null',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var testData, testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            testData = {
              transactionAmount: null
            };
            testHeader = '3030303030';
            accountNumber = '1212121212';
            _context4.next = 5;
            return _index.chai.request(_index.app).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('cashier-id', testHeader).send(testData);

          case 5:
            response = _context4.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Transaction amount is required');

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if transaction amount does not exist',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var testData, testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            testData = {};
            testHeader = '3030303030';
            accountNumber = '1212121212';
            _context5.next = 5;
            return _index.chai.request(_index.app).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('cashier-id', testHeader).send(testData);

          case 5:
            response = _context5.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Transaction amount is required');

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if transaction amount is not a number',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var testData, testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            testData = {
              transactionAmount: 'haha@Iamlaffing123'
            };
            testHeader = '3030303030';
            accountNumber = '1212121212';
            _context6.next = 5;
            return _index.chai.request(_index.app).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('cashier-id', testHeader).send(testData);

          case 5:
            response = _context6.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Transaction amount must be numbers');

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if cashier id is an empty string',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var testData, testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            testData = {
              transactionAmount: '1000'
            };
            testHeader = '';
            accountNumber = '1212121212';
            _context7.next = 5;
            return _index.chai.request(_index.app).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('cashier-id', testHeader).send(testData);

          case 5:
            response = _context7.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Cashier id is required');

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if cashier id is not a number',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var testData, testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            testData = {
              transactionAmount: '1000'
            };
            testHeader = 'hahah@again';
            accountNumber = '1212121212';
            _context8.next = 5;
            return _index.chai.request(_index.app).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('cashier-id', testHeader).send(testData);

          case 5:
            response = _context8.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Cashier id must be numbers');

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if cashier id is null',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9() {
    var testData, testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            testData = {
              transactionAmount: '1000'
            };
            testHeader = null;
            accountNumber = '1212121212';
            _context9.next = 5;
            return _index.chai.request(_index.app).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('cashier-id', testHeader).send(testData);

          case 5:
            response = _context9.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Cashier id must be numbers');

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if cashier id is not registered',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10() {
    var testData, testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            testData = {
              transactionAmount: '1000'
            };
            testHeader = '3030303030303030300';
            accountNumber = '1212121212';
            _context10.next = 5;
            return _index.chai.request(_index.app).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('cashier-id', testHeader).send(testData);

          case 5:
            response = _context10.sent;
            (0, _index.expect)(response).to.have.status(404);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(404);
            (0, _index.expect)(response.body).to.have.property('error').equal('Staff not found, only registered staff can debit or credit a bank account');

          case 10:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if account number is not a number',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11() {
    var testData, testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            testData = {
              transactionAmount: '1000'
            };
            testHeader = '3030303030';
            accountNumber = 'hahah@llslsl';
            _context11.next = 5;
            return _index.chai.request(_index.app).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('cashier-id', testHeader).send(testData);

          case 5:
            response = _context11.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Account number must be numbers');

          case 10:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it('Should NOT debit a bank account with an amount as a signed in Staff at "/api/v1/:transactions/:account_number/debit" if account number is not a number',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12() {
    var testData, testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            testData = {
              transactionAmount: '1000'
            };
            testHeader = '3030303030';
            accountNumber = '12121212128888';
            _context12.next = 5;
            return _index.chai.request(_index.app).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('cashier-id', testHeader).send(testData);

          case 5:
            response = _context12.sent;
            (0, _index.expect)(response).to.have.status(404);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(404);
            (0, _index.expect)(response.body).to.have.property('error').equal('Account number not found');

          case 10:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
});
//# sourceMappingURL=debitAccounts.js.map