"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-cond-assign */
_dotenv["default"].config();

var connectionString = process.env.PGDATABASE_DEVELOPMENT;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.PGDATABASE_TEST;
}

if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.PGDATABASE_PRODUCTION;
}

var config = {
  connectionString: connectionString
};
var pool = new _pg["default"].Pool(config);
var _default = pool;
exports["default"] = _default;