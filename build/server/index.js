"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _winston = _interopRequireDefault(require("winston"));

require("@babel/polyfill");

var _index = _interopRequireDefault(require("./routes/v1/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use(_express["default"]["static"]('./UI'));
app.use('/', _index["default"]);
var port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
  port = process.env.TEST_PORT;
}

var server = app.listen(port, function () {
  _winston["default"].info("app running on ".concat(port, "..."));
});
var _default = server;
exports["default"] = _default;