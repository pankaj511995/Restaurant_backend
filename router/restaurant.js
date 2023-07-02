import {Router}from 'express'
import {authenticate}from '../authentication/authenticate.js'
import {RegisterRestaurant,getRestaurantDetails,getAllRestaurant}from '../controller/restaurant.js'

const router=Router()

// router.post('/addnew',authenticate,RegisterRestaurant)

router.get('/:pagenumber',authenticate,getAllRestaurant)

router.get('/details/:id',authenticate,getRestaurantDetails)

export default router