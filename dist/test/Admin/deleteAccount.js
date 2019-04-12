"use strict";

var _index = require("../index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_index.chai.use(_index.chaiHttp);

describe('Test endpoints at "/api/v1/accounts/:account_number" to delete a bank account and all associated transactions as a signed in Admin with DELETE', function () {
  it('Should delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if all request headers and params are valid',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            testHeader = '5050505050';
            accountNumber = '1212121212';
            _context.next = 4;
            return _index.chai.request(_index.app).delete("/api/v1/accounts/".concat(accountNumber)).set('admin-id', testHeader);

          case 4:
            response = _context.sent;
            (0, _index.expect)(response).to.have.status(200);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(200);
            (0, _index.expect)(response.body).to.have.property('message').equal('Account successfully deleted');

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if admin id is an empty string',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            testHeader = '';
            accountNumber = '1212121212';
            _context2.next = 4;
            return _index.chai.request(_index.app).delete("/api/v1/accounts/".concat(accountNumber)).set('admin-id', testHeader);

          case 4:
            response = _context2.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Admin id is required');

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if admin id is not a number',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            testHeader = 'hahahahahah';
            accountNumber = '1212121212';
            _context3.next = 4;
            return _index.chai.request(_index.app).delete("/api/v1/accounts/".concat(accountNumber)).set('admin-id', testHeader);

          case 4:
            response = _context3.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Admin id must be numbers');

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if admin id is null',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            testHeader = null;
            accountNumber = '1212121212';
            _context4.next = 4;
            return _index.chai.request(_index.app).delete("/api/v1/accounts/".concat(accountNumber)).set('admin-id', testHeader);

          case 4:
            response = _context4.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Admin id must be numbers');

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if admin id is not found',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            testHeader = '84933948939398';
            accountNumber = '1212121212';
            _context5.next = 4;
            return _index.chai.request(_index.app).delete("/api/v1/accounts/".concat(accountNumber)).set('admin-id', testHeader);

          case 4:
            response = _context5.sent;
            (0, _index.expect)(response).to.have.status(404);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(404);
            (0, _index.expect)(response.body).to.have.property('error').equal('Admin not found, only registered admins can delete a bank account');

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if account number is not a number',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            testHeader = '5050505050';
            accountNumber = 'hahahahah';
            _context6.next = 4;
            return _index.chai.request(_index.app).delete("/api/v1/accounts/".concat(accountNumber)).set('admin-id', testHeader);

          case 4:
            response = _context6.sent;
            (0, _index.expect)(response).to.have.status(400);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(400);
            (0, _index.expect)(response.body).to.have.property('error').equal('Account number must be numbers');

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if account number is not found',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            testHeader = '5050505050';
            accountNumber = '112323222223';
            _context7.next = 4;
            return _index.chai.request(_index.app).delete("/api/v1/accounts/".concat(accountNumber)).set('admin-id', testHeader);

          case 4:
            response = _context7.sent;
            (0, _index.expect)(response).to.have.status(404);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(404);
            (0, _index.expect)(response.body).to.have.property('error').equal('Account number not found');

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('Should NOT delete a bank account and all associated transactions as a signed in Admin at "/api/v1/accounts/:account_number" with DELETE if account number has already been deleted',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var testHeader, accountNumber, response;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            testHeader = '5050505050';
            accountNumber = '1212121212';
            _context8.next = 4;
            return _index.chai.request(_index.app).delete("/api/v1/accounts/".concat(accountNumber)).set('admin-id', testHeader);

          case 4:
            response = _context8.sent;
            (0, _index.expect)(response).to.have.status(404);
            (0, _index.expect)(response.body).to.be.an('object');
            (0, _index.expect)(response.body).to.have.property('status').equal(404);
            (0, _index.expect)(response.body).to.have.property('error').equal('Account number not found');

          case 9:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
});
//# sourceMappingURL=deleteAccount.js.map