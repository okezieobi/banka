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
_index.default.toggleAccountState = function (req, res) {
  if (!req.body.accountStatus) return _services.default.errorResponse(res, 400, 'Account status is required');
  if (!_services.default.checkName(req.body.accountStatus)) return _services.default.errorResponse(res, 400, 'Account status must be letters');
  if (req.body.accountStatus !== 'active' && req.body.accountStatus !== 'Active' && req.body.accountStatus !== 'dormant' && req.body.accountStatus !== 'Dormant') return _services.default.errorResponse(res, 400, 'Account status must equal active or dormant');
  if (!req.headers['admin-id']) return _services.default.errorResponse(res, 400, 'Admin id is required');
  if (!_services.default.checkNumber(req.headers['admin-id'])) return _services.default.errorResponse(res, 400, 'Admin id must be numbers');
  if (!_services.default.findById(_db.default.admins, req.headers, 'id', 'admin-id')) return _services.default.errorResponse(res, 404, 'Admin id not found, only registered admins can update an account detail');
  if (!_services.default.checkNumber(req.params.account_number)) return _services.default.errorResponse(res, 400, 'Account number must be a number');

  var bankAccount = _services.default.findById(_db.default.bankAccounts, req.params, 'accountNumber', 'account_number');

  if (!bankAccount) return _services.default.errorResponse(res, 404, 'Account number not found');
  bankAccount.status = req.body.accountStatus;

  var statusResponse = _db.default.updateAccountStatus(bankAccount);

  return _services.default.successResponse(res, 200, statusResponse);
};

var _default = _index.default.toggleAccountState;
exports.default = _default;
//# sourceMappingURL=toggleAccounts.js.map