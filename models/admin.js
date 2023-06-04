// for signin API https://pankajdevjs.onrender.com/user/signin
//for signin API https://pankajdevjs.onrender.com/user/signup
//  i have deployed these api and using same database for this ..
//crating default user just for authentication
// will add hotel id on fly 
const mongoose=require('mongoose')
const admin=new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    password:String,
    retaurantId:mongoose.Schema.Types.ObjectId
})

module.exports=mongoose.model('users',admin)
