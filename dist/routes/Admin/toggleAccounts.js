"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toggleAccounts = _interopRequireDefault(require("../../controllers/Admin/toggleAccounts"));

var _router = _interopRequireDefault(require("../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_router.default.patch('/accounts/:account_number', _toggleAccounts.default);

var _default = _router.default;
exports.default = _default;
//# sourceMappingURL=toggleAccounts.js.map