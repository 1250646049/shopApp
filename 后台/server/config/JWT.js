const jsonwebtoken = require("jsonwebtoken");

// 加密token

function addToken(user) {
  return jsonwebtoken.sign(user, "lshdwaudsjd", { expiresIn: "7 day" });
}

function devToken(token) {
  try {
    return {
      status: 1,
      user: jsonwebtoken.verify(token, "lshdwaudsjd"),
    };
  } catch {
    return {
      status: 0,
      message: "验证失败请重新登陆！",
    };
  }
}

module.exports={
    addToken,
    devToken
}