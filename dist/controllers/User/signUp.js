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
_index.default.userSignUp = function (req, res) {
  if (!req.body.userFirstName) return _services.default.errorResponse(res, 400, 'First name is required');
  if (!_services.default.checkName(req.body.userFirstName)) return _services.default.errorResponse(res, 400, 'First name must be letters');
  if (!req.body.userLastName) return _services.default.errorResponse(res, 400, 'Last name is required');
  if (!_services.default.checkName(req.body.userLastName)) return _services.default.errorResponse(res, 400, 'Last name must be letters');
  if (!req.body.userEmail) return _services.default.errorResponse(res, 400, 'Email is required');
  if (!_services.default.validateEmail(req.body.userEmail)) return _services.default.errorResponse(res, 400, 'Email format is wrong');
  if (!req.body.userPassword) return _services.default.errorResponse(res, 400, 'Password is required');
  if (!_services.default.validatePassword(req.body.userPassword)) return _services.default.errorResponse(res, 400, 'Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  if (_services.default.findOne(_db.default.users, req.body, 'email', 'userEmail')) return _services.default.errorResponse(res, 400, 'User exists, please sign in');

  var newUser = _db.default.userData(req.body);

  _db.default.users.push(newUser);

  var userDataRes = _db.default.createUserDataResponse(newUser);

  return _services.default.successResponse(res, 201, userDataRes);
};

var _default = _index.default.userSignUp;
exports.default = _default;
//# sourceMappingURL=signUp.js.map