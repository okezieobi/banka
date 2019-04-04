"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _signIn = _interopRequireDefault(require("../../controllers/User/signIn"));

var _router = _interopRequireDefault(require("../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_router.default.post('/auth/signin', _signIn.default);

var _default = _router.default;
exports.default = _default;
//# sourceMappingURL=signIn.js.map