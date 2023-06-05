
const Restaurant=require('../models/restaurant')
const Rating=require('../models/rating')
const mongoose=require('mongoose')
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
    const session=await mongoose.startSession()
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
        // console.log(_id,'details is ')
        if(!_id)return res.status(400).json({message:'enter valid id '})

        const restaurant=await Restaurant.findById(_id).select(['restaurantName','address','description','rating','totalReview'])
        res.status(200).json({data:restaurant})
    }catch(err){
        console.log(err.message,'error while gating details ')
        res.status(400).json({message:'try again '})
    }
}

const allReviewOfResturant=async(req,res)=>{
    try{
        const hotalId=req.params.Hid
        const pageNumber=req.query.pageNumber|0

        const ratingAll=await Restaurant.findById(hotalId)
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
const postReview=async(req,res)=>{
    const session=await mongoose.startSession()
    session.startTransaction()
    try{
        const NumberOfStar=Number(req.body.NumberOfStar)
        const comment=req.body.comment
        const hotalId=req.params.Hid
        if(!onlyString(comment)){
            return res.status(400).json({message:'enter only character'})
        }
        
        //take name form user and date wiil set by default value 
        const p1=Rating.create([{personName:req.user.name,NumberOfStar:NumberOfStar,comment:comment}],{session:session})
        const p2= Restaurant.findById(hotalId)

       // both will execute at a same time 
        const ratingRes=await Promise.all([p1,p2])
       
        const  totalRev=ratingRes[1].totalReview+ +1

        const  rating=(ratingRes[1].totalReview*ratingRes[1].rating + NumberOfStar) /(totalRev)
        // console.log(totalRev,rating.toFixed(3),ratingRes[0][0]._id)
///need ot review transaction 

        await Restaurant.findByIdAndUpdate(hotalId,{totalReview:totalRev,rating:rating.toFixed(3),$push:{ratingDetails:ratingRes[0][0]._id}}).session(session)
        await session.commitTransaction()
        res.status(200).json({message:'thanks '})
    }catch(err){
        await session.abortTransaction()
        console.log(err.message,'error while giving review ')
    }finally{
        await session.endSession()
    }
}
module.exports={
    RegisterRestaurant,
    getRestaurantDetails,
    allReviewOfResturant,
    getAllRestaurant,
    postReview
}