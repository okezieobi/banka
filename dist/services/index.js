"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Banka =
/*#__PURE__*/
function () {
  function Banka() {
    _classCallCheck(this, Banka);
  }

  _createClass(Banka, [{
    key: "validateEmail",
    value: function () {
      var _validateEmail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(email) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
                return _context.abrupt("return", this.emailPattern.test(email));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validateEmail(_x) {
        return _validateEmail.apply(this, arguments);
      }

      return validateEmail;
    }()
  }, {
    key: "validatePassword",
    value: function () {
      var _validatePassword = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(password) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                return _context2.abrupt("return", this.passwordPattern.test(password));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function validatePassword(_x2) {
        return _validatePassword.apply(this, arguments);
      }

      return validatePassword;
    }()
  }, {
    key: "checkName",
    value: function () {
      var _checkName = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(name) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.namePattern = /^[A-Za-z\s]+$/;
                return _context3.abrupt("return", this.namePattern.test(name));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function checkName(_x3) {
        return _checkName.apply(this, arguments);
      }

      return checkName;
    }()
  }, {
    key: "checkAmount",
    value: function () {
      var _checkAmount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(amount) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.amountPattern = /^[0-9]+$/;
                return _context4.abrupt("return", this.amountPattern.test(amount));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function checkAmount(_x4) {
        return _checkAmount.apply(this, arguments);
      }

      return checkAmount;
    }()
  }, {
    key: "findUser",
    value: function findUser(array, param) {
      this.foundUser = array.find(function (foundUser) {
        return foundUser.userEmail === param.userEmail;
      });
      return this.foundUser;
    }
  }, {
    key: "errorResponse",
    value: function errorResponse(res, status, error) {
      this.errRes = {
        status: status,
        error: error
      };
      res.send(this.errRes);
    }
  }, {
    key: "successResponse",
    value: function successResponse(res, status, data) {
      this.successRes = {
        status: status,
        data: data
      };
      res.send(this.successRes);
    }
  }]);

  return Banka;
}();

var banka = new Banka();
var _default = banka;
exports.default = _default;
//# sourceMappingURL=index.js.map