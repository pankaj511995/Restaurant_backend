
import User from '../models/admin.js'
import {verify}from "jsonwebtoken"
export const authenticate= async(req,res,next)=>{
    try{ 
        if(!req.headers.authorization){
            return res.status(400).json({message:'please login first'})
        }
        
       const token= verify (req.headers.authorization,process.env.JWT_TOKEN)
    // const token= JWT.verify (process.env.TOKEN,process.env.JWT_TOKEN)
       if(!token) throw new Error('')
           const user= await User.findById(token.MongoUser)
           if(user){
    
            req.user=user 
            next() 
           }else throw new Error('')
                          
    }catch(err){ 
        console.log(err.message)
        error(res,'user does not exist','error while authentication')
    }

}