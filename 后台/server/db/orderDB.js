
const { getCurrentTime } = require("../config/utils")
const connect=require("./db")




// 查询所有的订单


function selectAllOrder(){
    return new Promise((reslove,reject)=>{
        connect.query("select * from ((`order` o left join shop s on o.sid=s.sid) left join address a on o.aid=a.aid) left join user u on o.uid=u.uid",(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    list:data.length?data.map(item=>{
                        item["key"]=item["oid"]
                        return {...item}
                    }):[]
                })
            }else {
                reject({
                    status:0,
                    message:"查询出错！"
                })
            }
        })


    })
}

// 取消订单

function updateOrder(status,oid){
    return new Promise((reslove,reject)=>{
        connect.query("update `order` set status=? where oid=?",[status,oid],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"更新成功！"
                })
            }else {
                reject({
                    status:0,
                    message:"更新失败！"
                })
            }
        })

    })



}


// 更新快递物流信息

function updateExpress(wuliu,oid){
    return new Promise((reslove,reject)=>{
       connect.query("select * from `order` where oid=?",[oid],(err,data)=>{
        if(!err){
           let {express}={...data[0]}
            if(express===null){
                wuliu=wuliu+"|"
            }else {
                wuliu=express+wuliu+"|"
            }
            connect.query("update `order` set express=? where oid=?",[wuliu,oid],(err,data)=>{
                if(!err) {
                    reslove({
                        status:1,
                        message:"更新成功！"
                    })
                }else {
                    reject({
                        status:0,
                        message:"更新失败！"
                    })
                }

            })
        }else {
            console.log(err)
        }


       })

    })


}


// 查询订单号

function selectOrder(oid){
    return new Promise((reslove,reject)=>{
        connect.query("select * from `order` where oid=?",[oid],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    list:data.length?[{...data[0],key:data[0]["oid"]}]:[]
                })
            }else {
                reject({
                    status:0,
                    message:"抱歉查询失败！"
                })
            }

        })

    })
}

// 加入订单

function addOrder({sid,uid,price,aid,total,number}){
 
    return new Promise((reslove,reject)=>{
        connect.query("insert into `order`(sid,uid,price,aid,total,number,otime,status) values(?,?,?,?,?,?,?,?)",
        [sid,uid,price,aid,total,number,getCurrentTime(),1,(err,data)=>{
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
        }]
        )


    })


}


// 根据用户id查询订单

function selectOrderByUid(uid){
    return new Promise((reslove,reject)=>{
        connect.query("select * from `order` o left join shop s on o.sid=s.sid  where uid=?",[uid],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"查询成功！",
                    list:data.length?data.map(item=>{
                        item["key"]=item["oid"]
                        return {...item}
                    }):[]
                })
            }else {
                console.log(err)
                reject({
                    status:0,
                    message:"查询失败"
                })
            }


        })


    })


}
module.exports={
    updateExpress,
    updateOrder,
    selectAllOrder,
    selectOrder,
    addOrder,
    selectOrderByUid
}
