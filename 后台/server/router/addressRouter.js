const express= require("express")
const Router=express.Router()
const {selectAllAddress,selectLikeAddress,insertAddress,selectAddressByUid}=require("../db/addressDB")
const {yzToken}=require("../middware/middWare")


// 查询所有地址项


Router.get("/selectAddress",yzToken,async(req,resp)=>{
    try{
        let result=await  selectAllAddress()
        resp.json(result)
    }catch(error){
        resp.json(error)
    }


})


// 模糊查询地址项

Router.get("/searchAddress",yzToken,async(req,resp)=>{
    const {search}=req.query
    try{
      let result=await selectLikeAddress(search)
        resp.json(result)
    }catch(error){
        resp.json(error)
    }

})

// 插入地址

Router.get("/insertAddress",async(req,resp)=>{
    const {uid,name,phone,address}=req.query

    try{
       let result= await insertAddress(name,address,phone,uid)
       resp.json(result)
    }catch(error){
        resp.json(error)
    }
})

// 查询用户地址

Router.get("/selectAddressByUid",async(req,resp)=>{
    const {uid}=req.query 

    try{
       let result= await selectAddressByUid(uid)
       resp.json(result)
    }catch(error){
        resp.json(error)
    }


})

module.exports=Router