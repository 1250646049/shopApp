"use strict";

var express = require("express");

var app = express();

var session = require("express-session");

var cookieParse = require("cookie-parser"); // 引入路由


var userRouter = require("./router/userRouter");

var cateGoryRouter = require("./router/categoryRouter");

var shopRouter = require("./router/shopRouter");

var cartRouter = require("./router/cartRouter");

var expressRouter = require("./router/addressRouter");

var orderRouter = require("./router/orderRouter"); // 暴露静态资源


app.use(cookieParse());
app.use(express["static"](__dirname + "/public"));
app.use(session({
  secret: "lawdsdwadsdwad",
  cookie: {
    maxAge: 80 * 1000,
    secure: false
  },
  resave: true,
  saveUninitialized: false
})); // 解析body

app.use(express.urlencoded({
  extended: true
}));
app.listen(3001, function (err) {
  if (!err) {
    console.log("http://localhost:3001");
    app.use(userRouter);
    app.use(cateGoryRouter);
    app.use(shopRouter);
    app.use(cartRouter);
    app.use(expressRouter);
    app.use(orderRouter);
  }
});