
import Restaurant from '../models/restaurant.js'

import{startSession}from 'mongoose'
const onlyString=(str)=>{

    for(let i=0;i<str.length;i++){
        //only . , require for writing few line of comment or in address 
        if(!/[a-zA-z,'.',',',' ']/.test(str[i])){
            return false
        }
    }
    return true
}

const RegisterRestaurant=async(req,res)=>{
    const session=await startSession()
    session.startTransaction()
    try{
       
        const{restaurantName,address,description}=req.body
       if(!onlyString(restaurantName) || !onlyString(address) ||!onlyString(description)){
        return res.status(400).json({messasge:'please enter no special character '})
                }

       const restaurant=await Restaurant.create([{restaurantName:restaurantName,address:address,adminId:req.user._id,       description:description}],{session:session}) 

            if(req.user.retaurantId){
                return res.status(400).json({message:'you can register only one resturant '})
            }

      await req.user.updateOne({retaurantId:restaurant._id },{session:session}) 
      await session.commitTransaction()
      
      res.status(200).json({data:restaurant[0]._id})// return resturant id 

    }catch(err){
        await session.abortTransaction()
        console.log(err.message,'error while resturant ')
        res.status(400).json({message:'try agaian or contact us by call'})
    }finally{
        await session.endSession()
    }
}
// page number is for applying pagination
const getAllRestaurant=async(req,res)=>{
        try{
            const pagenumber=req.params.pagenumber|0
            const restaurant =await Restaurant.find().select(['restaurantName','address']).sort([['rating',-1]]).skip(pagenumber*10).limit(10)
          
            res.status(200).json({data:restaurant})
        }catch(err){
            console.log(err.message,'gating all resturant ')
            res.status(400).json({message:'try agaian '})
        }
}
const getRestaurantDetails=async(req,res)=>{
    try{ 
        const _id=req.params.id
        if(!_id)return res.status(400).json({message:'enter valid id '})

        const restaurant=await Restaurant.findById(_id).select(['totalReview','rating','restaurantName','address','description'])
        res.status(200).json({data:restaurant})
    }catch(err){
        console.log(err.message,'error while gating details ')
        res.status(400).json({message:'try again '})
    }
}



export {
    RegisterRestaurant,
    getRestaurantDetails,
    onlyString,
    getAllRestaurant,
    
}