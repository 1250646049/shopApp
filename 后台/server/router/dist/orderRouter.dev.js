"use strict";

var express = require("express");

var Router = express.Router();

var _require = require("../db/orderDB"),
    selectAllOrder = _require.selectAllOrder,
    selectOrder = _require.selectOrder,
    updateExpress = _require.updateExpress,
    updateOrder = _require.updateOrder,
    addOrder = _require.addOrder,
    selectOrderByUid = _require.selectOrderByUid;

var _require2 = require("../middware/middWare"),
    yzToken = _require2.yzToken; // 查询所有订单项


Router.get("/selectAllOrder", yzToken, function _callee(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(selectAllOrder());

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
}); // 查询指定的订单

Router.get("/searchOrder", yzToken, function _callee2(req, resp) {
  var oid, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          oid = req.query.oid;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(selectOrder(oid));

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
}); // 更新物流信息

Router.post("/updateExpress", yzToken, function _callee3(req, resp) {
  var _req$body, express, oid, result;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, express = _req$body.express, oid = _req$body.oid;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(updateExpress(express, oid));

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
}); // 插入新订单

Router.get("/addOrder", function _callee4(req, resp) {
  var _req$query, sid, uid, price, aid, total, number, result;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$query = req.query, sid = _req$query.sid, uid = _req$query.uid, price = _req$query.price, aid = _req$query.aid, total = _req$query.total, number = _req$query.number;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(addOrder({
            sid: sid,
            uid: uid,
            price: price,
            aid: aid,
            total: total,
            number: number
          }));

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
}); // 更新订单状态

Router.post("/updateStatus", yzToken, function _callee5(req, resp) {
  var _req$body2, status, oid, result;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, status = _req$body2.status, oid = _req$body2.oid;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(updateOrder(status, oid));

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
}); // 查询用户订单

Router.get("/selectOrderByUid", function _callee6(req, resp) {
  var uid, result;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          uid = req.query.uid;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(selectOrderByUid(uid));

        case 4:
          result = _context6.sent;
          resp.json(result);
          _context6.next = 11;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          resp.json(_context6.t0);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = Router;