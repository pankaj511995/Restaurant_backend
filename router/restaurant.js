const{Router}=require('express')
const { RegisterRestaurant, getRestaurantDetails,
    allReviewOfResturant, getAllRestaurant,postReview}=require('../controller/restaurant')
    
const {authenticate}=require('../authentication/authenticate')

const router=Router()

router.post('/addnew',authenticate,RegisterRestaurant)

router.get('/allrestaurant/:pagenumber',authenticate,getAllRestaurant)

router.get('/details/:id',authenticate,getRestaurantDetails)

router.get('/allreview/:Hid',authenticate,allReviewOfResturant)

router.post('/review/:Hid',authenticate,postReview)



module.exports=router