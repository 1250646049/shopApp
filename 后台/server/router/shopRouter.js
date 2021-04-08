const express= require("express")
const Router=express.Router()
const {addShop,deleteShop,selectAllShop,selectLike,alterShop,uploads,selectById}=require("../db/shopDB")
const {yzToken}=require("../middware/middWare")
const Multer=require("multer")
const upload=Multer()
// 添加商品
Router.post("/addShop",yzToken,async(req,resp)=>{
    const {sname,price,intro,cid,detail,color,size,big,other,img}=req.body
    
      try{
        let result=await addShop({sname,price,intro,cid,detail,color,size,big,other,img})
        resp.json(result)
      }catch(error){
          resp.json(error)
      }

    



})

// 查询商品

Router.post("/selectAllShop",async(req,resp)=>{

     try{
        let result=  await selectAllShop()
        resp.json(result)
     }catch(error){
         resp.json(error)
     }


})

// 模糊匹配

Router.get("/serchShop",async(req,resp)=>{
    const {cname}=req.query

  try{
    let result=  await selectLike(cname)
    resp.json(result)
  }catch(error){
    resp.json(error)
  }


})


// 修改商品
Router.post("/alterShop",yzToken,async(req,resp)=>{
    const {sid,sname,price,intro,cid,detail,color,size,big,other}=req.body

    try{
        let result= await alterShop(sid,sname,price,intro,cid,detail,color,size,big,other)
        resp.json(result)
    }catch(error){
        resp.json(error)
    }

})

// 删除商品

Router.get("/deleteShop",yzToken,async(req,resp)=>{
    const {sid}=req.query

    try{
        let result=await deleteShop(sid)
        resp.json(result)
    }catch(error){
        resp.json(error)
    }


})

// 上传图片

Router.post("/uploadImg",upload.fields([{name:"file",maxCount:1}]),async(req,resp)=>{
    try{
        let files=req.files 
        let file=files["file"][0]
       let result= await uploads(file) 
       resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"上传失败"
        })
    }


})

// 修改商品

Router.post("/updateShop",yzToken,async(req,resp)=>{
   const {sid,sname,price,intro,cid,detail,color,size,big,other,img}=req.body

  try{
    let result=await alterShop({sid,sname,price,intro,cid,detail,color,size,big,other,img})
    resp.json(result)
  }catch(error){
    resp.json(error)
  }


})


// 查询sid单个商品

Router.get("/selectSid",async(req,resp)=>{
  const {sid}=req.query

  try{
    let result=  await selectById(sid)
    resp.json(result)
  }catch(err){
    resp.json(err)
  }
})
module.exports=Router
