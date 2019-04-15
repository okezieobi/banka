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
_index.default.createBankAccount = function (req, res) {
  if (!req.headers['owner-id']) return _services.default.errorResponse(res, 400, 'User Id is required');
  if (!_services.default.checkNumber(req.headers['owner-id'])) return _services.default.errorResponse(res, 400, 'User id must be numbers');
  if (!req.body.bankAccountType) return _services.default.errorResponse(res, 400, 'Bank account type is required');
  if (!_services.default.checkName(req.body.bankAccountType)) return _services.default.errorResponse(res, 400, 'Bank account type must be letters');
  if (req.body.bankAccountType !== 'current' && req.body.bankAccountType !== 'savings' && req.body.bankAccountType !== 'Current' && req.body.bankAccountType !== 'Savings') return _services.default.errorResponse(res, 400, 'Bank account type must be savings or current');

  var findUser = _services.default.findById(_db.default.users, req.headers, 'id', 'owner-id');

  if (!findUser) return _services.default.errorResponse(res, 400, 'Only registered users can create bank accounts, please sign up');

  var newBankAccount = _db.default.bankAccount(req.body);

  var bankAccountRes = _db.default.createBankAccountResponse(newBankAccount, findUser);

  return _services.default.successResponse(res, 201, bankAccountRes);
};

var _default = _index.default.createBankAccount;
exports.default = _default;
//# sourceMappingURL=createBankAccount.js.map