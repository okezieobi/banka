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
_index.default.userSignIn = function (req, res) {
  if (!req.body.userEmail) return _services.default.errorResponse(res, 400, 'Email is required');
  if (!_services.default.validateEmail(req.body.userEmail)) return _services.default.errorResponse(res, 400, 'Email format is wrong');
  if (!req.body.userPassword) return _services.default.errorResponse(res, 400, 'Password is required');
  if (!_services.default.validatePassword(req.body.userPassword)) return _services.default.errorResponse(res, 400, 'Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');

  var registeredUser = _services.default.findByValue(_db.default.users, req.body, 'email', 'userEmail');

  if (!registeredUser) return _services.default.errorResponse(res, 400, 'User does not exist, please sign up');
  if (registeredUser.password !== req.body.userPassword) return _services.default.errorResponse(res, 400, 'Password does not match user');

  var responseUserData = _db.default.createUserDataResponse(registeredUser);

  return _services.default.successResponse(res, 200, responseUserData);
};

var _default = _index.default.userSignIn;
exports.default = _default;
//# sourceMappingURL=signIn.js.map