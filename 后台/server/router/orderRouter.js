const express=require("express")
const Router=express.Router()
const {selectAllOrder,selectOrder,updateExpress,updateOrder,addOrder,selectOrderByUid}=require("../db/orderDB")
const {yzToken}=require("../middware/middWare")

// 查询所有订单项

Router.get("/selectAllOrder",yzToken,async(req,resp)=>{

    try{
      let result=await selectAllOrder()
      resp.json(result)
    }catch(error){
        resp.json(error)
    }

})


// 查询指定的订单

Router.get("/searchOrder",yzToken,async(req,resp)=>{
    const {oid}=req.query

    try{
     let result=await selectOrder(oid)
     resp.json(result)
    }catch(error){
        resp.json(error)
    }


})


// 更新物流信息

Router.post("/updateExpress",yzToken,async(req,resp)=>{
    const {express,oid}=req.body

    try{
      let result= await updateExpress(express,oid)
      resp.json(result)
    }catch(error){
        resp.json(error)
    }
})

// 插入新订单

Router.get("/addOrder",async(req,resp)=>{
    const {sid,uid,price,aid,total,number}=req.query
  
    try{
      let result=  await addOrder({sid,uid,price,aid,total,number})
      resp.json(result)
    }catch(err){
        resp.json(err)
    }
})
// 更新订单状态

Router.post("/updateStatus",yzToken,async(req,resp)=>{
    const {status,oid}=req.body

    try{
     let result=await updateOrder(status,oid)
     resp.json(result)
    }catch(error){
        resp.json(error)
    }
})

// 查询用户订单

Router.get("/selectOrderByUid",async(req,resp)=>{
    const {uid}=req.query
   
    try{
       let result=await selectOrderByUid(uid)
       resp.json(result)
    }catch(error){
        resp.json(error)
    }


})
module.exports=Router