"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var connect = require("./db");

var _require = require("../config/utils"),
    getCurrentTime = _require.getCurrentTime; // 查询所有订单


function selectAllCart() {
  return new Promise(function (reslove, reject) {
    connect.query("select * from (cart c left join shop s on c.sid=s.sid) left join user u on c.uid=u.uid", function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          list: data.length ? data.map(function (item) {
            item["key"] = item["cartid"];
            return _objectSpread({}, item);
          }) : []
        });
      } else {
        reject({
          status: 0,
          message: "查询失败！"
        });
      }
    });
  });
} // 模糊查询


function selectLiKECart(sname) {
  return new Promise(function (reslove, reject) {
    connect.query("select * from cart c left join shop s on c.sid=s.sid where s.sname like ?", ["%".concat(sname, "%")], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          list: data.length ? data.map(function (item) {
            item["key"] = item["cartid"];
            return _objectSpread({}, item);
          }) : []
        });
      } else {
        reject({
          status: 0,
          message: "抱歉，查询出错！"
        });
      }
    });
  });
} // 加入新购物车


function addCart(sid, uid, number, total) {
  return new Promise(function (reslove, reject) {
    connect.query("insert into cart(sid,uid,ctime,number,total) values(?,?,?,?,?)", [sid, uid, getCurrentTime(), number, total], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "success"
        });
      } else {
        reject({
          status: 0,
          message: "error"
        });
      }
    });
  });
} // 查询用户购物车内的数据


function selectByUid(uid) {
  return new Promise(function (reslove, reject) {
    connect.query("select * from cart c left join shop s on c.sid=s.sid  where uid=?", [uid], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          list: data.length ? data.map(function (item) {
            return _objectSpread({}, item);
          }) : []
        });
      } else {
        reject({
          status: 0,
          message: "error"
        });
      }
    });
  });
} // 删除单个购物项


function deleteCart(cartid) {
  return new Promise(function (reslove, reject) {
    connect.query("delete from cart where cartid=?", [cartid], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "success"
        });
      } else {
        reject({
          status: 0,
          message: "error"
        });
      }
    });
  });
}

module.exports = {
  selectAllCart: selectAllCart,
  selectLiKECart: selectLiKECart,
  addCart: addCart,
  selectByUid: selectByUid,
  deleteCart: deleteCart
};