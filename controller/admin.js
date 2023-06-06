const Restaurant=require('../models/restaurant')

exports.AdminAnalysis=async(req,res)=>{
  try{
    const pagenumber=req.params.pagenumber |0//can take page number form params or query 

    const restaurant=await Restaurant.find(). select(['adminId','restaurantName','totalReview']).sort([['totalReview',-1]]).skip(pagenumber*10).limit(10)


    res.status(200).json({data:restaurant})
  } catch(err){
    console.log(err.message,'error while gating analysis')
    res.status(400).json({message:'something went wrong'})
  } 
}