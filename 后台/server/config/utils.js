const moment=require("moment")
const uuid=require("uuid")
const md5=require("md5")
moment.locale("zh-ch")
const time=moment()


// 获取当前时间
function getCurrentTime(){

    return  time.format("YYYY-MM-DD hh:mm:ss")
}
// md5加密
function addMd5(str){

    return md5(str)
}

// 回去uuid

function getUUID(){

    return uuid.v4().replaceAll("-","")
}
module.exports={
    getCurrentTime,
    getUUID,
    addMd5
}

