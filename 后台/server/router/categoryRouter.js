const express= require("express")

const Router =express.Router()
const {addCategory,selectAllCategory,selectSingCategory2name
,updateSingleCategory,updateSingleShow,deleteSingCategory
}=require("../db/categoryDB")

const {yzToken}=require("../middware/middWare")



// 查询所有分类
Router.get("/selectAllC",async(req,resp)=>{
    try{
        let result=  await selectAllCategory()
        resp.json(result)
    }catch(error){
        resp.json(error)
    }
})


// 模糊搜索

Router.get("/serch",yzToken,async(req,resp)=>{
    const {cname}=req.query

    try{
        let data=await selectSingCategory2name(cname)
        resp.json(data)
    }catch(error){
        resp.json(error)
    }



})


// 修改数据

Router.post("/updateCategory",yzToken,async (req,resp)=>{
    const {cid,cname}=req.body 
     try{
        let data= await updateSingleCategory(cid,cname)
        resp.json(data)
     }catch(error){
         resp.json(error)
     }

})

// 更新show

Router.get("/updateSingleShow",yzToken,async(req,resp)=>{
    const {cid,show}=req.query
    try{
      let d= await updateSingleShow(cid,show)
      resp.json(d)
    }catch(error){
        resp.json(error)
    }

})


// 删除分类

Router.get("/deleteSingCategory",yzToken,async(req,resp)=>{
    const {cid}=req.query
  
    try{
        let data=await  deleteSingCategory(cid)
        resp.json(data)
    }catch(error){
        resp.json(error)
    }

})

// 添加分类

Router.get("/addCategory",yzToken,async(req,resp)=>{
         const {cname,show}=req.query   
    try{
        let d =await addCategory(cname,show)
        resp.json(d)
    }catch(error){
        resp.json(error)
    }

})
module.exports=Router