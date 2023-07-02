
import {Schema,model}from 'mongoose'
const rating=new Schema({
    personName:{
        type:String,
        require:true
    },
    NumberOfStar:{
        type:Number,
        require:true
    },
    comment :{

        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:Schema.Types.ObjectId
    }
    ,restaurant:{
        type:Schema.Types.ObjectId
    }
})
export default model('rating',rating)