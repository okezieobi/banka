"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
    value: function validateEmail(email) {
      this.emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      return this.emailPattern.test(email);
    }
  }, {
    key: "validatePassword",
    value: function validatePassword(password) {
      this.passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return this.passwordPattern.test(password);
    }
  }, {
    key: "checkName",
    value: function checkName(name) {
      this.namePattern = /^[A-Za-z\s]+$/;
      return this.namePattern.test(name);
    }
  }, {
    key: "checkNumber",
    value: function checkNumber(amount) {
      this.amountPattern = /^[0-9]+$/;
      return this.amountPattern.test(amount);
    }
  }, {
    key: "checkUserName",
    value: function checkUserName(username) {
      this.usernamePattern = /^[a-zA-Z0-9\s.-]+$/;
      return this.usernamePattern.test(username);
    }
  }, {
    key: "findOne",
    value: function findOne(array, param, arrayAny, paramAny) {
      this.foundItem = array.find(function (found) {
        return found[arrayAny] === param[paramAny];
      });
      return this.foundItem;
    }
  }, {
    key: "errorResponse",
    value: function errorResponse(res, codeStatus, error) {
      this.errRes = {
        status: codeStatus,
        error: error
      };
      res.status(codeStatus).send(this.errRes);
    }
  }, {
    key: "successResponse",
    value: function successResponse(res, codeStatus, data) {
      this.successRes = {
        status: codeStatus,
        data: data
      };
      res.status(codeStatus).send(this.successRes);
    }
  }]);

  return Banka;
}();

var banka = new Banka();
var _default = banka;
exports.default = _default;
//# sourceMappingURL=index.js.map