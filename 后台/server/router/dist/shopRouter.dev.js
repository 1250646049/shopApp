"use strict";

var express = require("express");

var Router = express.Router();

var _require = require("../db/shopDB"),
    addShop = _require.addShop,
    deleteShop = _require.deleteShop,
    selectAllShop = _require.selectAllShop,
    selectLike = _require.selectLike,
    alterShop = _require.alterShop,
    uploads = _require.uploads,
    selectById = _require.selectById;

var _require2 = require("../middware/middWare"),
    yzToken = _require2.yzToken;

var Multer = require("multer");

var upload = Multer(); // 添加商品

Router.post("/addShop", yzToken, function _callee(req, resp) {
  var _req$body, sname, price, intro, cid, detail, color, size, big, other, img, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, sname = _req$body.sname, price = _req$body.price, intro = _req$body.intro, cid = _req$body.cid, detail = _req$body.detail, color = _req$body.color, size = _req$body.size, big = _req$body.big, other = _req$body.other, img = _req$body.img;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(addShop({
            sname: sname,
            price: price,
            intro: intro,
            cid: cid,
            detail: detail,
            color: color,
            size: size,
            big: big,
            other: other,
            img: img
          }));

        case 4:
          result = _context.sent;
          resp.json(result);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          resp.json(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 查询商品

Router.post("/selectAllShop", function _callee2(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(selectAllShop());

        case 3:
          result = _context2.sent;
          resp.json(result);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          resp.json(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 模糊匹配

Router.get("/serchShop", function _callee3(req, resp) {
  var cname, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          cname = req.query.cname;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(selectLike(cname));

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
}); // 修改商品

Router.post("/alterShop", yzToken, function _callee4(req, resp) {
  var _req$body2, sid, sname, price, intro, cid, detail, color, size, big, other, result;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, sid = _req$body2.sid, sname = _req$body2.sname, price = _req$body2.price, intro = _req$body2.intro, cid = _req$body2.cid, detail = _req$body2.detail, color = _req$body2.color, size = _req$body2.size, big = _req$body2.big, other = _req$body2.other;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(alterShop(sid, sname, price, intro, cid, detail, color, size, big, other));

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
}); // 删除商品

Router.get("/deleteShop", yzToken, function _callee5(req, resp) {
  var sid, result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          sid = req.query.sid;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(deleteShop(sid));

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
}); // 上传图片

Router.post("/uploadImg", upload.fields([{
  name: "file",
  maxCount: 1
}]), function _callee6(req, resp) {
  var files, file, result;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          files = req.files;
          file = files["file"][0];
          _context6.next = 5;
          return regeneratorRuntime.awrap(uploads(file));

        case 5:
          result = _context6.sent;
          resp.json(result);
          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          resp.json({
            status: 0,
            message: "上传失败"
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // 修改商品

Router.post("/updateShop", yzToken, function _callee7(req, resp) {
  var _req$body3, sid, sname, price, intro, cid, detail, color, size, big, other, img, result;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$body3 = req.body, sid = _req$body3.sid, sname = _req$body3.sname, price = _req$body3.price, intro = _req$body3.intro, cid = _req$body3.cid, detail = _req$body3.detail, color = _req$body3.color, size = _req$body3.size, big = _req$body3.big, other = _req$body3.other, img = _req$body3.img;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(alterShop({
            sid: sid,
            sname: sname,
            price: price,
            intro: intro,
            cid: cid,
            detail: detail,
            color: color,
            size: size,
            big: big,
            other: other,
            img: img
          }));

        case 4:
          result = _context7.sent;
          resp.json(result);
          _context7.next = 11;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          resp.json(_context7.t0);

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 查询sid单个商品

Router.get("/selectSid", function _callee8(req, resp) {
  var sid, result;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          sid = req.query.sid;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(selectById(sid));

        case 4:
          result = _context8.sent;
          resp.json(result);
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](1);
          resp.json(_context8.t0);

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = Router;