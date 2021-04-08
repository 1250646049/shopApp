const connect= require("./db")
const {getCurrentTime}=require("../config/utils")


// 查询所有地址项目

function selectAllAddress(){
    return new Promise((reslove,reject)=>{
        connect.query("select * from address o left join user u on o.uid=u.uid",(err,data)=>{
            if(!err){
               reslove({
                   status:1,
                   list:data.length?data.map((item)=>{
                    item["key"]=item["aid"]
                    return {...item};
                   }):[]
               })
            }else {
                reject({
                    status:0,
                    message:"抱歉，查询失败！"
                })
            }


        })



    })
}

// 添加一个地址

function insertAddress(name,address,phone,uid){

    return new Promise((reslove,reject)=>{
        connect.query("insert into address(name,address,phone,atime,uid) values(?,?,?,?,?)",[name,address,phone,getCurrentTime(),uid],(err,data)=>{

            if(!err){
                reslove({
                    status:1,
                    message:"success"
                })
            }else {
           
                reject({
                    status:0,
                    message:"error"
                })
            }

        })


    })
}

// 模糊查询

function selectLikeAddress(detail){
    detail=`%${detail}%`
    return new Promise((reslove,reject)=>{
        connect.query("select * from address where concat(name,address,phone) like ?", [detail],(err,data)=>{

            if(!err){
                reslove({
                    status:1,
                    list:data.length?data.map((item)=>{
                     item["key"]=item["aid"]
                     return {...item};
                    }):[]
                })
            }else {
                reject({
                    status:"0",
                    message:"抱歉查询失败！"
                })
            }

        })



    })

}


// 根据用户查询地址信息

function selectAddressByUid(uid){
    
    return new Promise((reslove,reject)=>{
        connect.query("select * from address where uid=?",[uid],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    list:data.length?data.map(item=>({...item})):[]
                })
            }else {
                reject({
                    status:0,
                    message:"查询出错"
                })
            }
        })


    })
}
module.exports={
    selectAllAddress,
    selectLikeAddress,
    insertAddress,
    selectAddressByUid
}