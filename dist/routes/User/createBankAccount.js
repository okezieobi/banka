"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createBankAccount = _interopRequireDefault(require("../../controllers/User/createBankAccount"));

var _router = _interopRequireDefault(require("../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_router.default.post('/accounts', _createBankAccount.default);

var _default = _router.default;
exports.default = _default;
//# sourceMappingURL=createBankAccount.js.map