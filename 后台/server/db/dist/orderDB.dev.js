"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require("../config/utils"),
    getCurrentTime = _require.getCurrentTime;

var connect = require("./db"); // 查询所有的订单


function selectAllOrder() {
  return new Promise(function (reslove, reject) {
    connect.query("select * from ((`order` o left join shop s on o.sid=s.sid) left join address a on o.aid=a.aid) left join user u on o.uid=u.uid", function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          list: data.length ? data.map(function (item) {
            item["key"] = item["oid"];
            return _objectSpread({}, item);
          }) : []
        });
      } else {
        reject({
          status: 0,
          message: "查询出错！"
        });
      }
    });
  });
} // 取消订单


function updateOrder(status, oid) {
  return new Promise(function (reslove, reject) {
    connect.query("update `order` set status=? where oid=?", [status, oid], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "更新成功！"
        });
      } else {
        reject({
          status: 0,
          message: "更新失败！"
        });
      }
    });
  });
} // 更新快递物流信息


function updateExpress(wuliu, oid) {
  return new Promise(function (reslove, reject) {
    connect.query("select * from `order` where oid=?", [oid], function (err, data) {
      if (!err) {
        var _data$ = _objectSpread({}, data[0]),
            express = _data$.express;

        if (express === null) {
          wuliu = wuliu + "|";
        } else {
          wuliu = express + wuliu + "|";
        }

        connect.query("update `order` set express=? where oid=?", [wuliu, oid], function (err, data) {
          if (!err) {
            reslove({
              status: 1,
              message: "更新成功！"
            });
          } else {
            reject({
              status: 0,
              message: "更新失败！"
            });
          }
        });
      } else {
        console.log(err);
      }
    });
  });
} // 查询订单号


function selectOrder(oid) {
  return new Promise(function (reslove, reject) {
    connect.query("select * from `order` where oid=?", [oid], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          list: data.length ? [_objectSpread({}, data[0], {
            key: data[0]["oid"]
          })] : []
        });
      } else {
        reject({
          status: 0,
          message: "抱歉查询失败！"
        });
      }
    });
  });
} // 加入订单


function addOrder(_ref) {
  var sid = _ref.sid,
      uid = _ref.uid,
      price = _ref.price,
      aid = _ref.aid,
      total = _ref.total,
      number = _ref.number;
  return new Promise(function (reslove, reject) {
    connect.query("insert into `order`(sid,uid,price,aid,total,number,otime,status) values(?,?,?,?,?,?,?,?)", [sid, uid, price, aid, total, number, getCurrentTime(), 1, function (err, data) {
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
    }]);
  });
} // 根据用户id查询订单


function selectOrderByUid(uid) {
  return new Promise(function (reslove, reject) {
    connect.query("select * from `order` o left join shop s on o.sid=s.sid  where uid=?", [uid], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "查询成功！",
          list: data.length ? data.map(function (item) {
            item["key"] = item["oid"];
            return _objectSpread({}, item);
          }) : []
        });
      } else {
        console.log(err);
        reject({
          status: 0,
          message: "查询失败"
        });
      }
    });
  });
}

module.exports = {
  updateExpress: updateExpress,
  updateOrder: updateOrder,
  selectAllOrder: selectAllOrder,
  selectOrder: selectOrder,
  addOrder: addOrder,
  selectOrderByUid: selectOrderByUid
};