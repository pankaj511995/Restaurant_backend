const mongoose=require('mongoose')

const rating=new mongoose.Schema({
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
    }
})
module.exports=mongoose.model('rating',rating)