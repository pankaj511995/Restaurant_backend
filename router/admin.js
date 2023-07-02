import {Router}from 'express'
import {authenticate}from '../authentication/authenticate.js'
import {AdminAnalysis}from '../controller/admin.js'


const router=Router()

router.get('/analysis/:pagenumber',authenticate,AdminAnalysis)


export default router