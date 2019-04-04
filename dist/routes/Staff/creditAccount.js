"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _creditAccounts = _interopRequireDefault(require("../../controllers/Staff/creditAccounts"));

var _router = _interopRequireDefault(require("../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_router.default.post('/transactions/:account_number/credit', _creditAccounts.default);

var _default = _router.default;
exports.default = _default;
//# sourceMappingURL=creditAccount.js.map