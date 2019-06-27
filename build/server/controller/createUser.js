"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _schema = _interopRequireDefault(require("../helper/schema"));

var _errorHandler = _interopRequireDefault(require("../helper/errorHandler"));

var _responseSchema = _interopRequireDefault(require("../helper/responseSchema"));

var _queries = _interopRequireDefault(require("../model/queries"));

var _helper = _interopRequireDefault(require("../helper/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CreateUser =
/*#__PURE__*/
function () {
  function CreateUser() {
    _classCallCheck(this, CreateUser);
  }

  _createClass(CreateUser, null, [{
    key: "signUp",

    /**
     * @method - This creates a new account for a user
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} Success or failure message
     */
    value: function () {
      var _signUp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var result, password, salt, hashedPassword, _req$body, firstname, lastname, email, isadmin, dbOperationResult, args, dbOperationResult2, id, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (req.body.isadmin === 'true') {
                  req.body.isadmin = true;
                } else {
                  req.body.isadmin = false;
                }

                result = _joi["default"].validate(req.body, _schema["default"].userSchema, {
                  convert: false
                });

                if (!(result.error === null)) {
                  _context.next = 25;
                  break;
                }

                password = req.body.password;
                _context.next = 6;
                return _bcrypt["default"].genSalt(10);

              case 6:
                salt = _context.sent;
                _context.next = 9;
                return _bcrypt["default"].hash(password, salt);

              case 9:
                hashedPassword = _context.sent;
                _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname, email = _req$body.email, isadmin = _req$body.isadmin;
                _context.next = 13;
                return _helper["default"].wrapDbOperationInTryCatchBlock(res, _queries["default"].checkIfEmailExists, [email]);

              case 13:
                dbOperationResult = _context.sent;

                if (!(dbOperationResult.rowCount === 0)) {
                  _context.next = 24;
                  break;
                }

                args = [firstname, lastname, hashedPassword, email, isadmin];
                _context.next = 18;
                return _helper["default"].wrapDbOperationInTryCatchBlock(res, _queries["default"].insertNewUser, args);

              case 18:
                dbOperationResult2 = _context.sent;
                id = dbOperationResult2.rows[0].id;
                token = _jsonwebtoken["default"].sign({
                  id: id,
                  email: email,
                  firstname: firstname
                }, process.env.SECRETKEY);
                dbOperationResult2.rows[0].token = token;
                res.set('x-auth-token', token);
                return _context.abrupt("return", res.status(201).json(_responseSchema["default"].success('Signup Successful!Login With your new email', dbOperationResult2.rows[0])));

              case 24:
                return _context.abrupt("return", res.status(409).json(_responseSchema["default"].failure('chosen username/email already exists, choose a unique username.', {})));

              case 25:
                _errorHandler["default"].validationError(res, result);

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }]);

  return CreateUser;
}();

exports["default"] = CreateUser;