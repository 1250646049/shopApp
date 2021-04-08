const connect= require("./db")
const {getCurrentTime}=require("../config/utils")



// 查询所有订单

function selectAllCart(){

    return new Promise((reslove,reject)=>{
        connect.query("select * from (cart c left join shop s on c.sid=s.sid) left join user u on c.uid=u.uid",(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    list:data.length?data.map((item)=>{
                        item["key"]=item["cartid"]

                        return {...item}
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



// 模糊查询

function selectLiKECart(sname){

    return new Promise((reslove,reject)=>{

        connect.query("select * from cart c left join shop s on c.sid=s.sid where s.sname like ?",
        [`%${sname}%`],(err,data)=>{

            if(!err){
                reslove({
                    status:1,
                    list:data.length?data.map((item)=>{
                        item["key"]=item["cartid"]

                        return {...item}

                    }):[]
                })
            }else {
                reject({
                    status:0,
                    message:"抱歉，查询出错！"
                })
            }

        }
        )


    })

}


// 加入新购物车

function addCart(sid,uid,number,total){
    return new Promise((reslove,reject)=>{
        connect.query("insert into cart(sid,uid,ctime,number,total) values(?,?,?,?,?)",[sid,uid,getCurrentTime(),number,total],(err,data)=>{
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

// 查询用户购物车内的数据

function selectByUid(uid){
    return new Promise((reslove,reject)=>{
        connect.query("select * from cart c left join shop s on c.sid=s.sid  where uid=?",[uid],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    list:data.length?data.map(item=>({...item})):[]
                })
            }else {
                reject({status:0,message:"error"})
            }


        })

    })
}

// 删除单个购物项
function deleteCart(cartid){
    return new Promise((reslove,reject)=>{
        connect.query("delete from cart where cartid=?",[cartid],(err,data)=>{
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

module.exports={
    selectAllCart,
    selectLiKECart,
    addCart,
    selectByUid,
    deleteCart
}