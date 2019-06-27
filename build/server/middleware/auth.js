"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Authentication =
/*#__PURE__*/
function () {
  function Authentication() {
    _classCallCheck(this, Authentication);
  }

  _createClass(Authentication, null, [{
    key: "auth",

    /**
     * @param {object} req client request Object
     * @param {object} res server response object
     * @param {object} next control structure to continue processing
     * @returns {JSON}
     */
    value: function auth(req, res, next) {
      var token = req.header('x-auth-token');

      if (!token) {
        return res.status(401).json({
          status: 'failure',
          message: 'No access token provided!'
        });
      }

      if (token) {
        try {
          var decoded = _jsonwebtoken["default"].verify(token, process.env.SECRETKEY);

          req.user = decoded;
          next();
        } catch (error) {
          return res.status(400).send({
            status: 'failure',
            message: 'Invalid Token!'
          });
        }
      }
    }
  }]);

  return Authentication;
}();

exports["default"] = Authentication;