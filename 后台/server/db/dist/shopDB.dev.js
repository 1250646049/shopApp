"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var connecting = require("./db");

var _require = require("../config/utils"),
    getCurrentTime = _require.getCurrentTime,
    getUUID = _require.getUUID;

var fs = require("fs"); // 增加商品


function addShop(_ref) {
  var sname = _ref.sname,
      price = _ref.price,
      intro = _ref.intro,
      cid = _ref.cid,
      detail = _ref.detail,
      color = _ref.color,
      size = _ref.size,
      big = _ref.big,
      other = _ref.other,
      img = _ref.img,
      _ref$times = _ref.times,
      times = _ref$times === void 0 ? getCurrentTime() : _ref$times;
  return new Promise(function (reslove, reject) {
    connecting.query("insert into shop(sname,price,intro,cid,detail,color,size,big,other,img,`times`) values(?,?,?,?,?,?,?,?,?,?,?)", [sname, price, intro, cid, detail, color, size, big, other, img, times], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "恭喜你加入成功"
        });
      } else {
        console.log(err);
        reject({
          status: 0,
          message: "抱歉，加入出错"
        });
      }
    });
  });
} // 查询商品


function selectAllShop() {
  return new Promise(function (reslove, reject) {
    connecting.query("select * from shop s left join category c on s.cid=c.cid", function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          list: data.length > 0 ? data.map(function (item) {
            item["key"] = item["sid"];
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
} // 删除商品


function deleteShop(sid) {
  return new Promise(function (reslove, reject) {
    connecting.query("delete from shop where sid=?", [sid], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "删除成功！"
        });
      } else {
        reject({
          status: 0,
          message: "删除失败！"
        });
      }
    });
  });
} // 修改商品


function alterShop(_ref2) {
  var sid = _ref2.sid,
      sname = _ref2.sname,
      price = _ref2.price,
      intro = _ref2.intro,
      cid = _ref2.cid,
      detail = _ref2.detail,
      color = _ref2.color,
      size = _ref2.size,
      big = _ref2.big,
      other = _ref2.other,
      img = _ref2.img;
  return new Promise(function (reslove, reject) {
    connecting.query("update shop set sname=?,price=?,`intro`=?,cid=?,`detail`=?,color=?,size=?,big=?,other=?,img=? where sid=?", [sname, price, intro, cid, detail, color, size, big, other, img, sid], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "修改成功！"
        });
      } else {
        console.log(err);
        reject({
          status: 0,
          message: "修改失败！"
        });
      }
    });
  });
} // 模糊查询


function selectLike(sname) {
  return new Promise(function (reslove, reject) {
    connecting.query("select * from shop where sname like ?", ["%".concat(sname, "%")], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "查询成功！",
          list: data.length > 0 ? data.map(function (item) {
            return _objectSpread({}, item);
          }) : []
        });
      } else {
        reject({
          status: 0,
          message: "查询失败",
          list: []
        });
      }
    });
  });
} // 商品图片上传


function uploads(img) {
  var originalname = img.originalname,
      size = img.size,
      buffer = img.buffer;
  var type = originalname.substring(originalname.lastIndexOf("."));
  return new Promise(function (reslove, reject) {
    var fileName = getUUID() + type;
    fs.writeFile("public/img/".concat(fileName), buffer.toString("base64"), {
      encoding: "base64"
    }, function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          fileName: fileName,
          realName: originalname,
          size: size,
          path: "img"
        });
      } else {
        reject({
          status: 0,
          message: "上传失败！"
        });
      }
    });
  });
} // 根据sid查询商品


function selectById(sid) {
  console.log(sid);
  return new Promise(function (reslove, reject) {
    connecting.query("select * from shop where sid=?", [sid], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          list: _objectSpread({}, data[0])
        });
      } else {
        reject({
          status: 0,
          message: "查询失败！"
        });
      }
    });
  });
}

module.exports = {
  selectAllShop: selectAllShop,
  selectLike: selectLike,
  alterShop: alterShop,
  deleteShop: deleteShop,
  addShop: addShop,
  uploads: uploads,
  selectById: selectById
};