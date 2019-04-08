"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _signUp = _interopRequireDefault(require("../../controllers/User/signUp"));

var _router = _interopRequireDefault(require("../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_router.default.post('/auth/signup', _signUp.default);

var _default = _router.default;
exports.default = _default;
//# sourceMappingURL=signUp.js.map