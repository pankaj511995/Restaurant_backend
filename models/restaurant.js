const mongoose=require('mongoose')

const restaurant=new mongoose.Schema({
    restaurantName:{
        type:String,
        require:true
    },address:{
        type:String,
        require:true
    },
    adminId:{
        type:String,
        require:true
    },
    totalReview:{
        type:Number,
        default:0
    },

    rating:{
        type:Number,
        require:true,
        default:0
    },description:{
        type:String,
        require:true
    },
    ratingDetails:[{type:mongoose.Schema.Types.ObjectId,ref:'rating'}]
})
// restaurant.pre('findOneAndUpdate',()=>{

// })
module.exports=mongoose.model('restaurant',restaurant)