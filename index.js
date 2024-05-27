const express=require("express");
const app=express();
const myRouter=require("./routes/url");
const staticRouter=require("./routes/staticRouter");
const path=require("path");
const URL=require("./models/url") ;
const dotenv=require('dotenv');
dotenv.config();
const userRouter=require("./routes/user")
const { connectMongoDB } = require("./connection");
const cookieParser=require("cookie-parser");
const {restrictToLoggedInUserOnly,checkAuth}=require('./middlewares/auth');

const PORT=process.env.PORT||3000;


//connectMongoDB("mongodb://127.0.0.1:27017/urlDB")
connectMongoDB("mongodb+srv://rivu8619:G6L4sLr6oWMSjbds@cluster1.vrfoe3m.mongodb.net/")

app.set('view engine','ejs');
app.set("views",path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url",restrictToLoggedInUserOnly,myRouter);
app.use("/",checkAuth,staticRouter);
app.use("/user",userRouter);

app.listen(PORT,(req,res)=>{
    console.log(`listenting on port number ${PORT}`);
});

/*app.get('/test',async(req,res)=>{
    const allURL=await URL.find({});
    res.render(__dirname+'/views/home',{urls:allURL});
    /*res.end(`
    <html>
    <body>
    <ol>
      ${allURL.map(url=>`<li>${url.shortId}-${url.redirectURL}-${url.visitHistory.length}</li>`).join("")}
    </ol>
    </body>
    </html>
    `)
})*/

/*This route below is also an url shortener (by mistake) but the difference is that 
we have to put the _id instead of the shortId but as MongoDB has unique _id for 
each insertion that's why it is possible in this case.*/
/*app.get('/:shortId',async(req,res)=>{
    const entry=await URL.findById(req.params.shortId)
    if(!entry){
        return res.status(404).json({err:"User not found"})
    }

    //return res.json(user);
    res.redirect(entry.redirectURL)

})*/

/*app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({shortId},{
        $push: {
            visitHistory:{timestamp:Date.now()}
        }
    })
   //console.log(entry);
   res.redirect(entry.redirectURL);
})*/

