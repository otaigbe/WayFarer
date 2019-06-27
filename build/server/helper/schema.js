"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Schemas =
/*#__PURE__*/
function () {
  function Schemas() {
    _classCallCheck(this, Schemas);
  }

  _createClass(Schemas, null, [{
    key: "userSchema",

    /**
     * returns schema for validating user signup data
     * @returns {Object} schema for validation
     */
    get: function get() {
      return _joi["default"].object({
        firstname: _joi["default"].string().min(2).trim().required(),
        lastname: _joi["default"].string().trim().min(2).required(),
        password: _joi["default"].string().alphanum().min(4).trim().max(50).required(),
        email: _joi["default"].string().email().min(5).trim().required(),
        isadmin: _joi["default"]["boolean"]().required()
      });
    }
  }]);

  return Schemas;
}();

exports["default"] = Schemas;