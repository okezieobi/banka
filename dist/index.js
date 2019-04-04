"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || '3000';

_app.default.listen(port, function () {
  console.log("App is live and listening on port ".concat(port, "!"));
});

var _default = _app.default;
exports.default = _default;
//# sourceMappingURL=index.js.map