"use strict";

var express = require("express");

var Router = express.Router();

var _require = require("../db/addressDB"),
    selectAllAddress = _require.selectAllAddress,
    selectLikeAddress = _require.selectLikeAddress,
    insertAddress = _require.insertAddress,
    selectAddressByUid = _require.selectAddressByUid;

var _require2 = require("../middware/middWare"),
    yzToken = _require2.yzToken; // 查询所有地址项


Router.get("/selectAddress", yzToken, function _callee(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(selectAllAddress());

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
}); // 模糊查询地址项

Router.get("/searchAddress", yzToken, function _callee2(req, resp) {
  var search, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          search = req.query.search;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(selectLikeAddress(search));

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
}); // 插入地址

Router.get("/insertAddress", function _callee3(req, resp) {
  var _req$query, uid, name, phone, address, result;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$query = req.query, uid = _req$query.uid, name = _req$query.name, phone = _req$query.phone, address = _req$query.address;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(insertAddress(name, address, phone, uid));

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
}); // 查询用户地址

Router.get("/selectAddressByUid", function _callee4(req, resp) {
  var uid, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          uid = req.query.uid;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(selectAddressByUid(uid));

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
});
module.exports = Router;