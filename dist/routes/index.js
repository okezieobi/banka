"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _signUp = _interopRequireDefault(require("./User/signUp"));

var _signIn = _interopRequireDefault(require("./User/signIn"));

var _createBankAccount = _interopRequireDefault(require("./User/createBankAccount"));

var _creditAccount = _interopRequireDefault(require("./Staff/creditAccount"));

var _debitAccount = _interopRequireDefault(require("./Staff/debitAccount"));

var _toggleAccounts = _interopRequireDefault(require("./Admin/toggleAccounts"));

var _deleteAccount = _interopRequireDefault(require("./Admin/deleteAccount"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var versionNumber = '/api/v1';

var _default = function _default(app) {
  app.use(versionNumber, _signUp.default);
  app.use(versionNumber, _signIn.default);
  app.use(versionNumber, _createBankAccount.default);
  app.use(versionNumber, _debitAccount.default);
  app.use(versionNumber, _creditAccount.default);
  app.use(versionNumber, _deleteAccount.default);
  app.use(versionNumber, _toggleAccounts.default);
};

exports.default = _default;
//# sourceMappingURL=index.js.map