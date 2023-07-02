import {Router}from 'express'
import {authenticate}from '../authentication/authenticate.js'
import {allReviewOfResturant,postReview}from '../controller/review.js'

const router=Router()

router.get('/:Hid',authenticate,allReviewOfResturant)

router.post('/:Hid',authenticate,postReview)



export default router