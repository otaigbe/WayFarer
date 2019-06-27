"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sanitizer =
/*#__PURE__*/
function () {
  function Sanitizer() {
    _classCallCheck(this, Sanitizer);
  }

  _createClass(Sanitizer, null, [{
    key: "sanitizeUserBioData",

    /**
       * @param {object} req client request Object
       * @param {object} res server response object
       * @param {object} next control structure to continue processing
       * @returns {JSON}
       */
    value: function sanitizeUserBioData() {
      return [(0, _expressValidator.check)('password').trim(), (0, _expressValidator.check)('email').isEmail().trim().normalizeEmail(), (0, _expressValidator.check)('firstname').trim(), (0, _expressValidator.check)('lastname').trim(), (0, _expressValidator.check)('isadmin').trim()];
    }
  }]);

  return Sanitizer;
}();

exports["default"] = Sanitizer;