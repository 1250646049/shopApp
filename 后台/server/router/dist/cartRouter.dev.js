"use strict";

var express = require("express");

var Router = express.Router();

var _require = require("../db/cartDB"),
    selectAllCart = _require.selectAllCart,
    selectLiKECart = _require.selectLiKECart,
    addCart = _require.addCart,
    selectByUid = _require.selectByUid,
    deleteCart = _require.deleteCart;

var _require2 = require("../middware/middWare"),
    yzToken = _require2.yzToken; // 查询所有购物车项目


Router.get("/selectAllCart", yzToken, function _callee(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(selectAllCart());

        case 3:
          result = _context.sent;
          resp.json(result);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          resp.json(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 模糊查询

Router.get("/searchCart", yzToken, function _callee2(req, resp) {
  var sname, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          sname = req.query.sname;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(selectLiKECart(sname));

        case 4:
          result = _context2.sent;
          resp.json(result);
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
}); // 加入购物车

Router.get("/addCart", function _callee3(req, resp) {
  var _req$query, sid, uid, number, total, result;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$query = req.query, sid = _req$query.sid, uid = _req$query.uid, number = _req$query.number, total = _req$query.total;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(addCart(sid, uid, number, total));

        case 4:
          result = _context3.sent;
          resp.json(result);
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
}); // 查询用户购物车项目

Router.get("/selectByUid", function _callee4(req, resp) {
  var uid, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          uid = req.query.uid;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(selectByUid(uid));

        case 4:
          result = _context4.sent;
          resp.json(result);
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
}); // 删除用户购物项

Router.get("/deleteCart", function _callee5(req, resp) {
  var cartid, result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          cartid = req.query.cartid;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(deleteCart(cartid));

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
}); // 暴露路由

module.exports = Router;