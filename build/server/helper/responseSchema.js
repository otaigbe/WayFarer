"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* istanbul ignore file */
var Response =
/*#__PURE__*/
function () {
  function Response() {
    _classCallCheck(this, Response);
  }

  _createClass(Response, null, [{
    key: "success",

    /**
    * @constructor
    * @param {string} message - The success message.
    * @param {string} code - The http status code returned.
    */
    value: function success(message, resource) {
      var data = resource;
      return {
        status: 'Success',
        message: message,
        data: data
      };
    }
  }, {
    key: "failure",
    value: function failure(message, error) {
      var errorObj = error;
      errorObj.message = message;
      return {
        status: 'Failed',
        error: errorObj
      };
    }
  }]);

  return Response;
}();

exports["default"] = Response;