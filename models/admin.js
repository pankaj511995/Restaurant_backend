import {Schema,model}from 'mongoose'
const admin=new Schema({
    name:String,
    email:String,
    phone:String,
    password:String,
    retaurantId:[{type:Schema.Types.ObjectId,ref:'restaurant'}],
    rating:[{type:Schema.Types.ObjectId,ref:'ratig'}]
})

export default model('users',admin)
