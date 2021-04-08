const express= require("express")
const Router=express.Router()

const {selectAllCart,selectLiKECart,addCart,selectByUid,deleteCart}=require("../db/cartDB")
const {yzToken}=require("../middware/middWare")

// 查询所有购物车项目


Router.get("/selectAllCart",yzToken,async(req,resp)=>{

    try{
        let result= await selectAllCart()
  
        resp.json(result)
    }catch(error){
        resp.json(error)
    }



})

// 模糊查询

Router.get("/searchCart",yzToken,async(req,resp)=>{
    const {sname}=req.query

    try{
       let result= await selectLiKECart(sname)
       resp.json(result)
    }catch(error){
        resp.json(error)
    }



})
// 加入购物车

Router.get("/addCart",async(req,resp)=>{

    const {sid,uid,number,total}=req.query

    try{
      let result=  await addCart(sid,uid,number,total)
      resp.json(result)
    }catch(error){
        resp.json(error)
    }
})

// 查询用户购物车项目

Router.get("/selectByUid",async(req,resp)=>{
    const {uid}=req.query

    try{
     let result= await  selectByUid(uid)
     resp.json(result)
    }catch(error){resp.json(error)}

})

// 删除用户购物项

Router.get("/deleteCart",async(req,resp)=>{
    const {cartid}=req.query

    try{
      let result= await deleteCart(cartid)
      resp.json(result)
    }catch(error){resp.json(error)}


})


// 暴露路由

module.exports=Router