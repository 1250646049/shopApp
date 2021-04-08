const connecting= require("./db")
const {getCurrentTime,getUUID}=require("../config/utils")
const fs=require("fs")
// 增加商品

function addShop({sname,price,intro,cid,detail,color,size,big,other,img,times=getCurrentTime()}){

    return new Promise((reslove,reject)=>{ 

        connecting.query("insert into shop(sname,price,intro,cid,detail,color,size,big,other,img,`times`) values(?,?,?,?,?,?,?,?,?,?,?)",
        
        [sname,price,intro,cid,detail,color,size,big,other,img,times],(err,data)=>{

            if(!err){
                reslove({
                    status:1,
                    message:"恭喜你加入成功"
                })
            }else {
                console.log(err)
                reject({
                    status:0,
                    message:"抱歉，加入出错"
                })
            }

        }
        )


    })



}


// 查询商品


function selectAllShop(){
    return new Promise((reslove,reject)=>{
        connecting.query("select * from shop s left join category c on s.cid=c.cid",(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    list:data.length>0?data.map((item)=>{
                        item["key"]=item["sid"];

                        return {...item};

                    }):[]
                })
            }else {
                reject({
                    status:0,
                    message:"查询失败！"
                })
            }


        })


    })

}


// 删除商品

function deleteShop(sid){
    return new Promise((reslove,reject)=>{
        connecting.query("delete from shop where sid=?",[sid],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"删除成功！"
                })
            }else {
                reject({
                    status:0,
                    message:"删除失败！"
                })
            }
        })

    })
}


// 修改商品

function alterShop({sid,sname,price,intro,cid,detail,color,size,big,other,img}){
 
    return new Promise((reslove,reject)=>{ 
        connecting.query("update shop set sname=?,price=?,`intro`=?,cid=?,`detail`=?,color=?,size=?,big=?,other=?,img=? where sid=?",
        [sname,price,intro,cid,detail,color,size,big,other,img,sid],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"修改成功！"
                })
            }else {
                console.log(err)
                reject({
                    status:0,
                    message:"修改失败！"
                })
            }


        }
        )


    })

}


// 模糊查询

function selectLike(sname){

    return new Promise((reslove,reject)=>{
        connecting.query("select * from shop where sname like ?",[`%${sname}%`],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"查询成功！",
                    list:data.length>0?data.map((item)=>({...item})):[]
                })
            }else {
                reject({
                    status:0,
                    message:"查询失败",
                    list:[]
                })
            }


        })

    })

}

// 商品图片上传

function uploads(img){
  
    const {originalname,size,buffer}=img 
    const type=originalname.substring(originalname.lastIndexOf("."))
  
    return new Promise((reslove,reject)=>{
        let fileName=getUUID()+type;
        fs.writeFile(`public/img/${fileName}`,buffer.toString("base64"),{encoding:"base64"},(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    fileName,
                    realName:originalname,
                    size,
                    path:"img"
                })
            }else {
                reject({
                    status:0,
                    message:"上传失败！"
                })
            }

        })



    })


}

// 根据sid查询商品

function selectById(sid){
    console.log(sid)
    return new Promise((reslove,reject)=>{
        connecting.query("select * from shop where sid=?",[sid],(err,data)=>{

            if(!err){
                reslove({status:1,list:{...data[0]}})
            }else {
                reject({
                    status:0,
                    message:"查询失败！"
                })
            }

        })


    })
}

module.exports={
    selectAllShop,
    selectLike,
    alterShop,
    deleteShop,
    addShop,
    uploads,
    selectById
}