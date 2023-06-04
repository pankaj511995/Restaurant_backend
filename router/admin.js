const{Router}=require('express')
const {AdminAnalysis}=require('../controller/admin')
const{authenticate}=require('../authentication/authenticate')
const router=Router()

router.get('/analysis/:pagenumber',authenticate,AdminAnalysis)


module.exports=router