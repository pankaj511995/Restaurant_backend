
import Restaurant from '../models/restaurant.js'
import Rating from '../models/rating.js'
import{startSession}from 'mongoose'
import {onlyString} from './restaurant.js'

const postReview=async(req,res)=>{
    const session=await startSession()
    session.startTransaction()
    try{
      
        const NumberOfStar=Number(req.body.NumberOfStar)
        const comment=req.body.comment
        const hotalId=req.params.Hid

        if(!onlyString(comment)){
            return res.status(400).json({message:'enter only character'})
        }
        const restaurant=await Restaurant.findById(hotalId)
        const rating =await Rating.create([{
            personName:req.user.name,
            NumberOfStar:NumberOfStar,
            comment:comment,
            user:req.user._id,
            restaurant:restaurant._id
        }],{session:session})
       
        const  totalRev=restaurant.totalReview+ +1     
        const  star=(restaurant.totalReview*restaurant.rating + NumberOfStar) /(totalRev)

        restaurant.totalReview=totalRev
        restaurant.rating=star.toFixed(3)
        restaurant.ratingDetails.push(rating[0]._id)

        req.user.rating.push(rating._id)
        await req.user.save({session:session})
        await restaurant.save({session:session})
        await session.commitTransaction()
       
        res.status(200).json({message:'thanks '})
    }catch(err){
        await session.abortTransaction()
        console.log(err,'error while giving review ')
    }finally{
        await session.endSession()
    }
}
const allReviewOfResturant=async(req,res)=>{
    try{

        const restaurantlId=req.params.Hid
        const pageNumber=req.query.pageNumber|0
        const ratingAll=await Restaurant.findById(restaurantlId)
                            .populate([{
                                path:'ratingDetails',
                                model:'rating',
                                options:{
                                    skip:pageNumber*10,
                                    limit:10,
                                    sort:{'NumberOfStar':-1 }
                                },
                                
                            }])
        res.status(200).json({data:ratingAll.ratingDetails})
    }catch(err){
        console.log(err.message,' error while gating all rating  ')
    }
}

export {allReviewOfResturant,postReview}