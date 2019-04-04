"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "chai", {
  enumerable: true,
  get: function get() {
    return _chai.default;
  }
});
Object.defineProperty(exports, "expect", {
  enumerable: true,
  get: function get() {
    return _chai.expect;
  }
});
Object.defineProperty(exports, "chaiHttp", {
  enumerable: true,
  get: function get() {
    return _chaiHttp.default;
  }
});
Object.defineProperty(exports, "app", {
  enumerable: true,
  get: function get() {
    return _index.default;
  }
});

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }
//# sourceMappingURL=index.js.map