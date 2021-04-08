
const connection = require("./db");
const { getCurrentTime,addMd5,getUUID } = require("../config/utils");

// 管理员登陆

function aLogin(username, password) {
  return new Promise((reslove, reject) => {
    connection.query(
      "select * from auser where username=? and password=?",
      [username, password],
      (err, data) => {
        if (!err) {
          reslove({
            user: data[0]
              ? {
                  status: 1,
                  message: "登陆成功！",
                  user: { ...data[0] },
                }
              : {
                  status: 0,
                  message: "账号或密码错误！",
                  user: {},
                },
          });
        } else {
          reject({
            status: 0,
            message: "抱歉，服务出错啦....",
          });
        }
      }
    );
  });
}

// 普通用户登陆

function Login(username, password) {
  return new Promise((reslove, reject) => {
    connection.query(
      "select * from user where username=? and password=?",
      [username, addMd5(password)],
      (err, data) => {
        if (!err) {
          reslove({
              status:1,
              message:"注册成功！"
          })
        } else {
         reject({
             status:0,
             message:"注册失败！"
         })
        }
      }
    );
  });
}

// 普通用户注册
function register(user){
 
    const {username,password}=user;
    let time=getCurrentTime();
    let grad=0; //0默认权限 1vip权限
    return new Promise((reslove,reject)=>{
        // 
        connection.query("select * from user where username=?",[username],(err,data)=>{
            if(!err){
               if(data.length===0){
        //    验证成功 加入数据库
                connection.query("insert into user(username,password,times,grad,`key`) values(?,?,?,?,?)",[username,addMd5(password),time,grad,getUUID()],(err,data)=>{
                    if(!err) {
                        reslove({
                            status:1,
                            message:"注册成功"
                        })
                    }else {
                        console.log(err)
                        reject({
                        status:-1,
                        message:"出现错误，注册异常"
                    })
                }
                })
               } else {
                reslove({
                    status:0,
                    message:"用户名已经存在"
                })
               }
            }else reject({
                status:-1,
                message:"出现错误,注册失败！"

            })
        })
    })
}
// 查询所有普通用户分页查询


function selectUser(current){
    // 每页查询条数
    let singPage=10;
    return new Promise((reslove,reject)=>{
        connection.query("select count(*) from user",(err,data)=>{
            if(!err) {
                // totalcount
                let count=data[0]["count(*)"]
               
                connection.query("select * from user ",(err,data)=>{
                    if(!err){
                        reslove({
                            status:1,
                            message:"获取成功！",
                            list:data,
                            current,
                            total:count,
                            singPage
                        })
                    }else {
                        reject({
                            status:0,
                            message:"抱歉查询失败",
                            list:[]
                        })
                    }


                })

            }else {
                
            }
        })


    })

}

// 删除指定的用户

function deleteUser(){}

// 修改指定的用户

 function alterUser(uid,password,grad){
    
    return new Promise(async(reslove,reject)=>{
       let oldPassword="";
       if(!password){
        let data=await selectPassword(uid)
        oldPassword=data["password"]
       }
        connection.query("update user set password=?,grad=? where uid=?",[password?addMd5(password):oldPassword,grad,uid],(err,data)=>{
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

// 删除指定的用户 
function deleteUser(uid){
    console.log(uid)
    return new Promise((reslove,reject)=>{
        connection.query("delete from user where uid=?",[uid],(err,data)=>{
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
// 查询用户原来密码
function selectPassword(uid){

    return new Promise((reslove,reject)=>{
        connection.query("select * from user where uid=?",[uid],(err,data)=>{
            if(!err){
                reslove({...data[0],status:1})
            }else {
                reject({
                    status:0,
                message:"error"
                })
            }


        })

    })
}

// 普通用户登陆

function loginUser({username,password}){

    return new Promise((reslove,reject)=>{
        connection.query("select * from `user` where username=? and password=?",[username,addMd5(password)],(err,data)=>{
            if(!err){
                if(data.length){
                    reslove({
                        status:1,
                        message:"登陆成功",
                        data:{...data[0]}
                    })
                }else {
                    reslove({
                        status:2,
                        message:"登陆失败！"
                    })
                }

            }else {
                console.log(err)
                reject({
                    status:0,
                    message:"登陆失败！"
                })
            }


        })

    })

}


// 普通用户注册

function registerUser({username,password}){
  
    return new Promise((reslove,reject)=>{
        connection.query("insert into user(username,password,times,grad) values(?,?,?,?)",[username,addMd5(password),getCurrentTime(),1],(err,data)=>{
            if(!err){
               
                reslove({
                    status:1,
                    message:"注册成功！"
                })
            }else {
               
                reject({
                    status:0,
                    message:"注册失败！"
                })
            }


        })

    })


}

module.exports={
    Login,
    register,
    aLogin,
    selectUser,
    alterUser,
    deleteUser,
    loginUser,
    registerUser
}
