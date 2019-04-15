"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../index"));

var _db = _interopRequireDefault(require("../../db"));

var _services = _interopRequireDefault(require("../../services"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
_index.default.creditAccount = function (req, res) {
  if (!req.body.transactionAmount) return _services.default.errorResponse(res, 400, 'Transaction amount is required');
  if (!_services.default.checkNumber(req.body.transactionAmount)) return _services.default.errorResponse(res, 400, 'Transaction amount must be numbers');
  if (!_services.default.checkNumber(req.params.account_number)) return _services.default.errorResponse(res, 400, 'Account number must be numbers');
  if (!req.headers['cashier-id']) return _services.default.errorResponse(res, 400, 'Cashier id is required');
  if (!_services.default.checkNumber(req.headers['cashier-id'])) return _services.default.errorResponse(res, 400, 'Cashier id must be numbers');

  var findAccountNumber = _services.default.findById(_db.default.bankAccounts, req.params, 'accountNumber', 'account_number');

  var verifyCashier = _services.default.findById(_db.default.staff, req.headers, 'id', 'cashier-id');

  if (!findAccountNumber) return _services.default.errorResponse(res, 404, 'Account number not found');
  if (!verifyCashier) return _services.default.errorResponse(res, 404, 'Staff not found, only registered staff can debit or credit a bank account');
  req.params.accountBalance = findAccountNumber.balance;

  var newTransaction = _db.default.creditAccountTransaction(req.body, req.params, req.headers);

  var responseTransaction = _db.default.transactionResponse(newTransaction);

  findAccountNumber.balance += parseFloat(req.body.transactionAmount);
  return _services.default.successResponse(res, 201, responseTransaction);
};

var _default = _index.default.creditAccount;
exports.default = _default;
//# sourceMappingURL=creditAccounts.js.map