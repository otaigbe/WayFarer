"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _createUser = _interopRequireDefault(require("../../controller/createUser"));

var _sanitizer = _interopRequireDefault(require("../../middleware/sanitizer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/auth/signup', _sanitizer["default"].sanitizeUserBioData(), _createUser["default"].signUp);
var _default = router;
exports["default"] = _default;