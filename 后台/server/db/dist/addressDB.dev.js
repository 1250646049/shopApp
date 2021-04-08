"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var connect = require("./db");

var _require = require("../config/utils"),
    getCurrentTime = _require.getCurrentTime; // 查询所有地址项目


function selectAllAddress() {
  return new Promise(function (reslove, reject) {
    connect.query("select * from address o left join user u on o.uid=u.uid", function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          list: data.length ? data.map(function (item) {
            item["key"] = item["aid"];
            return _objectSpread({}, item);
          }) : []
        });
      } else {
        reject({
          status: 0,
          message: "抱歉，查询失败！"
        });
      }
    });
  });
} // 添加一个地址


function insertAddress(name, address, phone, uid) {
  return new Promise(function (reslove, reject) {
    connect.query("insert into address(name,address,phone,atime,uid) values(?,?,?,?,?)", [name, address, phone, getCurrentTime(), uid], function (err, data) {
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
} // 模糊查询


function selectLikeAddress(detail) {
  detail = "%".concat(detail, "%");
  return new Promise(function (reslove, reject) {
    connect.query("select * from address where concat(name,address,phone) like ?", [detail], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          list: data.length ? data.map(function (item) {
            item["key"] = item["aid"];
            return _objectSpread({}, item);
          }) : []
        });
      } else {
        reject({
          status: "0",
          message: "抱歉查询失败！"
        });
      }
    });
  });
} // 根据用户查询地址信息


function selectAddressByUid(uid) {
  return new Promise(function (reslove, reject) {
    connect.query("select * from address where uid=?", [uid], function (err, data) {
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
          message: "查询出错"
        });
      }
    });
  });
}

module.exports = {
  selectAllAddress: selectAllAddress,
  selectLikeAddress: selectLikeAddress,
  insertAddress: insertAddress,
  selectAddressByUid: selectAddressByUid
};