"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deleteAccount = _interopRequireDefault(require("../../controllers/Admin/deleteAccount"));

var _router = _interopRequireDefault(require("../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_router.default.delete('/accounts/:account_number', _deleteAccount.default);

var _default = _router.default;
exports.default = _default;
//# sourceMappingURL=deleteAccount.js.map