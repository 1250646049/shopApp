const express= require("express")
const app=express()
const session=require("express-session")
const cookieParse=require("cookie-parser")

// 引入路由
const userRouter= require("./router/userRouter")
const cateGoryRouter=require("./router/categoryRouter")
const shopRouter=require("./router/shopRouter")
const cartRouter=require("./router/cartRouter")
const expressRouter=require("./router/addressRouter")
const orderRouter=require("./router/orderRouter")
// 暴露静态资源
app.use(cookieParse())
app.use(express.static(__dirname+"/public"))
 
app.use(session({
    secret:"lawdsdwadsdwad",
    cookie:{maxAge: 80*1000,
    secure:false
    },
    resave:true,
    saveUninitialized:false,
    

}))


// 解析body

app.use(express.urlencoded({extended:true}))

app.listen(3001,(err)=>{
    if(!err){
        console.log("http://localhost:3001")
        app.use(userRouter)
        app.use(cateGoryRouter)
        app.use(shopRouter)
        app.use(cartRouter)
        app.use(expressRouter)
        app.use(orderRouter)
        
    }

})


