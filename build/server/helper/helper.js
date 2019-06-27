"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbHelper = _interopRequireDefault(require("../model/dbHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Class holding useful helper functions
 */
var Helpers =
/*#__PURE__*/
function () {
  function Helpers() {
    _classCallCheck(this, Helpers);
  }

  _createClass(Helpers, null, [{
    key: "wrapDbOperationInTryCatchBlock",

    /**
    * This method performs the sql query
    * @method
    * @param {object} res - server response object
    * @param {object} query - SQL query
    * @param {array} args - an array of arguments to be used as input to the query
    * @param {Object} - Query result
    */
    value: function () {
      var _wrapDbOperationInTryCatchBlock = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(res, query, args) {
        var dboperationResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _dbHelper["default"].performTransactionalQuery(query, args);

              case 3:
                dboperationResult = _context.sent;
                return _context.abrupt("return", dboperationResult);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  status: 'failure',
                  error: {
                    message: 'SQL Query Error'
                  }
                }));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function wrapDbOperationInTryCatchBlock(_x, _x2, _x3) {
        return _wrapDbOperationInTryCatchBlock.apply(this, arguments);
      }

      return wrapDbOperationInTryCatchBlock;
    }()
  }]);

  return Helpers;
}();

exports["default"] = Helpers;