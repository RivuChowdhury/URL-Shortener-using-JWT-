const express=require("express");
const router=express.Router();
const {handleGenerateNewURL,handleUpdateAndRedirect,handleAnalytics}=require("../controllers/url")

router.post('/',handleGenerateNewURL);
router.get('/:shortId',handleUpdateAndRedirect);
router.get('/analytics/:shortId',handleAnalytics);


module.exports=router;