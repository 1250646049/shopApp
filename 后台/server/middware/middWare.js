const {devToken}=require("../config/JWT")

// 判断验证码

function yzmWare(req,resp,next){
    const {code}=req.body 
    console.log(code,req.session)
    if(code!==req.session.code){
    
        resp.json({
            status:0,
            message:"操作失败，验证码错误"
        })
    }else {
        next();
    }



}

// 判断token

function yzToken(req,resp,next){
    const {authorized}=req.headers
    const {status}=devToken(authorized)
    if(status){
        next()
    }else {
        resp.json({
            status:0,
            message:"登陆过期"
        })
    }
}
module.exports={
    yzmWare,
    yzToken
}