
import {Schema,model}from 'mongoose'
const restaurant=new Schema({
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
    ratingDetails:[{type:Schema.Types.ObjectId,ref:'rating'}]
})
export default model('restaurant',restaurant)