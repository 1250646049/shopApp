const express= require("express")
const router=express.Router()
const captcha=require("svg-captcha")
const {addToken,devToken} =require("../config/JWT")
const {aLogin,selectUser,alterUser,deleteUser,loginUser,registerUser} =require("../db/userDB")
// 管理员登陆
const {yzToken}=require("../middware/middWare")
router.post("/adminLogin",async(req,resp)=>{
    const {username,password,code}=req.body
    if(code.toLowerCase()!==req.session.code.toLowerCase()){
       return resp.json({
            status:0,
            message:"抱歉，验证码输入错误！" 
        })
    }
   try{
    let data=   await aLogin(username,password)
    const {status,user}=data["user"]

    if(!status) return resp.json(data["user"])
    let token=addToken(user)
    resp.json({
        status:1,
        'user':{...user},
        'token':token,
        message:"登陆成功！"
    }) 
   }catch(error){
       resp.json(error)
   }

})

// 生成验证码

router.get("/yzm",(req,resp)=>{
    
  const {data,text}=captcha.create({
        size:4,
        fontSize:50,
        noise:3
    })
    req.session.code=text
    
    resp.send(data)

})

// 自动登陆

router.post("/auto",(req,resp)=>{
   const {authorized}=req.headers
    const data=  devToken(authorized)
    resp.json(data)
    
})


// 查询所有普通用户

router.get("/selectAllUser",yzToken,async(req,resp)=>{

    const {current}=req.query

  try{
    let data= await selectUser(current)
    resp.json(data)
  }catch(error){
      resp.json(error)
  }

})


// 修改指定的用户

router.post("/alterUser",yzToken,async(req,resp)=>{
    const {uid,password,grad}=req.body
   try{
    let data=await alterUser(uid,password,grad)
    resp.json(data)
   }catch(error){
       resp.json(error)
   }

})


// 删除用户id
router.get("/deluser",yzToken,async(req,resp)=>{
    const {uid}=req.query
     try{
        let data= await deleteUser(uid)
        resp.json(data)
     }catch(error){
        resp.json(error)
     }


})

// 普通用户登陆
router.get("/userLogin",async(req,resp)=>{
    const {username,password}=req.query
  
    try{
      let result= await loginUser({username,password})
      resp.json(result)
    }catch(error){
        resp.json(error)
    }
})

// 普通用户注册

router.get("/registerUser",async(req,resp)=>{
    const {username,password}=req.query
   
    try{
      let result= await registerUser({username,password})
      console.log(result)
      resp.json(result)
    }catch(error){
        resp.json(error)
    }
})

module.exports=router