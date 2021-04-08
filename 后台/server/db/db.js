const mysql= require("mysql")
const connection=mysql.createConnection({
    host:"localhost",
    port:"3306",
    database:"uniapp_shop",
    user:"root",
    password:"123456",
})
connection.connect()



module.exports=connection