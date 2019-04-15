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
_index.default.deleteAccount = function (req, res) {
  if (!req.headers['admin-id']) return _services.default.errorResponse(res, 400, 'Admin id is required');
  if (!_services.default.checkNumber(req.headers['admin-id'])) return _services.default.errorResponse(res, 400, 'Admin id must be numbers');
  if (!_services.default.findById(_db.default.admins, req.headers, 'id', 'admin-id')) return _services.default.errorResponse(res, 404, 'Admin not found, only registered admins can delete a bank account');
  if (!_services.default.checkNumber(req.params.account_number)) return _services.default.errorResponse(res, 400, 'Account number must be numbers');

  var bankAccount = _services.default.findById(_db.default.bankAccounts, req.params, 'accountNumber', 'account_number');

  if (!bankAccount) return _services.default.errorResponse(res, 404, 'Account number not found');

  _db.default.bankAccounts.splice(_db.default.bankAccounts.indexOf(bankAccount), 1);

  _db.default.transactions = _db.default.transactions.filter(function (transaction) {
    return transaction.accountNumber !== bankAccount.accountNumber;
  });
  return _services.default.successResMessage(res, 200, 'Account successfully deleted');
};

var _default = _index.default.deleteAccount;
exports.default = _default;
//# sourceMappingURL=deleteAccount.js.map