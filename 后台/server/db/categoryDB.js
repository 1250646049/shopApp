const connecting= require("./db")
const {getCurrentTime,getUUID}= require("../config/utils")

// 查询所有分类
function selectAllCategory(){
    return new Promise((reslove,reject)=>{
        connecting.query("select * from category",(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"查询成功",
                    list:data.length>0?data.map((item)=>{
                        item["key"]=getUUID();
                        return {...item}
                    }):[]
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


// 模糊查询
function selectSingCategory2name(cname){

    return new Promise((reslove,reject)=>{
        connecting.query("select * from category where cname like ?",[`%${cname}%`],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    list:data.length>0?data.map((item)=>{
                        item["key"]=getUUID();
                        return {...item}
                    }):[],
                    message:"查询成功！"
                })
            }else {
                reject({
                    status:0,
                    message:"查询失败！",
                    list:[]
                })
            }

        })
    })

}

// 删除指定分类

function deleteSingCategory(cid){
    return new Promise((reslove,reject)=>{
        connecting.query("delete from category where cid=?",[cid],(err,data)=>{
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

// 更新单个分类

function updateSingleCategory(cid,cname){

    return new Promise((reslove,reject)=>{
        connecting.query("update category set cname=? where cid=?",[cname,cid],(err,data)=>{
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
    
    
        })


    })

}

// 更新显示or不显示

function updateSingleShow(cid,show){

    return new Promise((reslove,reject)=>{
        connecting.query("update category set `show`=? where cid=?",[show,cid],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"修改成功！"
                })
            }else {
                reject({
                    status:0,
                    message:"修改失败！"
                })
            }

        })

    })
}

// 添加分类

function addCategory(cname,show=1){

    return new Promise((reslove,reject)=>{
        connecting.query("insert into category(cname,`show`,`time`) values(?,?,?)",[cname,show,getCurrentTime()],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"添加成功！"
                })
            }else {
                reject({
                    status:0,
                    message:"修改失败！"
                })
            }


        })


    })

}



module.exports={
    selectAllCategory,
    selectSingCategory2name,
    deleteSingCategory,
    updateSingleCategory,
    addCategory,
    updateSingleShow
}