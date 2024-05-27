const shortid = require('shortid');
const URL=require("../models/url");
const path=require('path');

async function handleGenerateNewURL(req,res){
    const shortID=shortid();
    const body=req.body;
    if(!body.url){
        return res.status(400).json({err:"URL is required"})
    }
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.url._id,
    })
    return res.render(path.join(__dirname,'../views/home'),{id:shortID});
    //return res.json({id:shortID})
}

async function handleUpdateAndRedirect(req,res){
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({shortId},{
        $push: {
            visitHistory:{timestamp:Date.now()}
        }
    })
   //console.log(entry);
   res.redirect(entry.redirectURL);
}

async function handleAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory
    })
}

module.exports={
    handleGenerateNewURL,
    handleUpdateAndRedirect,
    handleAnalytics,
}