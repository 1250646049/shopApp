"use strict";

var express = require("express");

var Router = express.Router();

var _require = require("../db/categoryDB"),
    addCategory = _require.addCategory,
    selectAllCategory = _require.selectAllCategory,
    selectSingCategory2name = _require.selectSingCategory2name,
    updateSingleCategory = _require.updateSingleCategory,
    updateSingleShow = _require.updateSingleShow,
    deleteSingCategory = _require.deleteSingCategory;

var _require2 = require("../middware/middWare"),
    yzToken = _require2.yzToken; // 查询所有分类


Router.get("/selectAllC", function _callee(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(selectAllCategory());

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
}); // 模糊搜索

Router.get("/serch", yzToken, function _callee2(req, resp) {
  var cname, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          cname = req.query.cname;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(selectSingCategory2name(cname));

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
}); // 修改数据

Router.post("/updateCategory", yzToken, function _callee3(req, resp) {
  var _req$body, cid, cname, data;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, cid = _req$body.cid, cname = _req$body.cname;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(updateSingleCategory(cid, cname));

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
}); // 更新show

Router.get("/updateSingleShow", yzToken, function _callee4(req, resp) {
  var _req$query, cid, show, d;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$query = req.query, cid = _req$query.cid, show = _req$query.show;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(updateSingleShow(cid, show));

        case 4:
          d = _context4.sent;
          resp.json(d);
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
}); // 删除分类

Router.get("/deleteSingCategory", yzToken, function _callee5(req, resp) {
  var cid, data;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          cid = req.query.cid;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(deleteSingCategory(cid));

        case 4:
          data = _context5.sent;
          resp.json(data);
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
}); // 添加分类

Router.get("/addCategory", yzToken, function _callee6(req, resp) {
  var _req$query2, cname, show, d;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$query2 = req.query, cname = _req$query2.cname, show = _req$query2.show;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(addCategory(cname, show));

        case 4:
          d = _context6.sent;
          resp.json(d);
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