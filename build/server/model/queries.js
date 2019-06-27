"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Queries =
/*#__PURE__*/
function () {
  function Queries() {
    _classCallCheck(this, Queries);
  }

  _createClass(Queries, null, [{
    key: "insertNewUser",
    get: function get() {
      return 'INSERT into users (firstname, lastname, password, email, isadmin) VALUES ($1, $2, $3, $4, $5) returning *';
    }
  }, {
    key: "checkIfEmailExists",
    get: function get() {
      return 'SELECT * FROM users WHERE email = $1';
    }
  }]);

  return Queries;
}();

exports["default"] = Queries;