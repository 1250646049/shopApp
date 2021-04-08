"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var router = express.Router();

var captcha = require("svg-captcha");

var _require = require("../config/JWT"),
    addToken = _require.addToken,
    devToken = _require.devToken;

var _require2 = require("../db/userDB"),
    aLogin = _require2.aLogin,
    selectUser = _require2.selectUser,
    alterUser = _require2.alterUser,
    deleteUser = _require2.deleteUser,
    loginUser = _require2.loginUser,
    registerUser = _require2.registerUser; // 管理员登陆


var _require3 = require("../middware/middWare"),
    yzToken = _require3.yzToken;

router.post("/adminLogin", function _callee(req, resp) {
  var _req$body, username, password, code, data, _data$user, status, user, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password, code = _req$body.code;

          if (!(code.toLowerCase() !== req.session.code.toLowerCase())) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", resp.json({
            status: 0,
            message: "抱歉，验证码输入错误！"
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(aLogin(username, password));

        case 6:
          data = _context.sent;
          _data$user = data["user"], status = _data$user.status, user = _data$user.user;

          if (status) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", resp.json(data["user"]));

        case 10:
          token = addToken(user);
          resp.json({
            status: 1,
            'user': _objectSpread({}, user),
            'token': token,
            message: "登陆成功！"
          });
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);
          resp.json(_context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 14]]);
}); // 生成验证码

router.get("/yzm", function (req, resp) {
  var _captcha$create = captcha.create({
    size: 4,
    fontSize: 50,
    noise: 3
  }),
      data = _captcha$create.data,
      text = _captcha$create.text;

  req.session.code = text;
  resp.send(data);
}); // 自动登陆

router.post("/auto", function (req, resp) {
  var authorized = req.headers.authorized;
  var data = devToken(authorized);
  resp.json(data);
}); // 查询所有普通用户

router.get("/selectAllUser", yzToken, function _callee2(req, resp) {
  var current, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          current = req.query.current;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(selectUser(current));

        case 4:
          data = _context2.sent;
          resp.json(data);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          resp.json(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 修改指定的用户

router.post("/alterUser", yzToken, function _callee3(req, resp) {
  var _req$body2, uid, password, grad, data;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, uid = _req$body2.uid, password = _req$body2.password, grad = _req$body2.grad;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(alterUser(uid, password, grad));

        case 4:
          data = _context3.sent;
          resp.json(data);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          resp.json(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 删除用户id

router.get("/deluser", yzToken, function _callee4(req, resp) {
  var uid, data;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          uid = req.query.uid;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(deleteUser(uid));

        case 4:
          data = _context4.sent;
          resp.json(data);
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          resp.json(_context4.t0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 普通用户登陆

router.get("/userLogin", function _callee5(req, resp) {
  var _req$query, username, password, result;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$query = req.query, username = _req$query.username, password = _req$query.password;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(loginUser({
            username: username,
            password: password
          }));

        case 4:
          result = _context5.sent;
          resp.json(result);
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          resp.json(_context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 普通用户注册

router.get("/registerUser", function _callee6(req, resp) {
  var _req$query2, username, password, result;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$query2 = req.query, username = _req$query2.username, password = _req$query2.password;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(registerUser({
            username: username,
            password: password
          }));

        case 4:
          result = _context6.sent;
          console.log(result);
          resp.json(result);
          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](1);
          resp.json(_context6.t0);

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
module.exports = router;